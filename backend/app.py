from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app) # Allow React to communicate with Flask

# Ensure we have the model files accessible before starting the app.
model_path = os.path.join(os.path.dirname(__file__), 'knn_model.pkl')
scaler_path = os.path.join(os.path.dirname(__file__), 'scaler.pkl')
regressor_path = os.path.join(os.path.dirname(__file__), 'knn_reg_model.pkl')

if os.path.exists(model_path) and os.path.exists(scaler_path) and os.path.exists(regressor_path):
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    regressor = joblib.load(regressor_path)
else:
    model = None
    scaler = None
    regressor = None
    print("Warning: Models not found! Please run train.py first.")

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or scaler is None or regressor is None:
        return jsonify({'error': 'Models not trained yet. Run train.py.', 'status': 'error'}), 500

    try:
        data = request.json
        age = float(data['age'])
        income = float(data['income'])
        gender_male = 1.0 if data['gender'].lower() == 'male' else 0.0
        
        # Format for model input
        input_data = pd.DataFrame([[age, income, gender_male]], 
                                  columns=['Age', 'Annual Income (k$)', 'Gender_Male'])
        
        # Scale the data and predict
        input_scaled = scaler.transform(input_data)
        prediction = model.predict(input_scaled)[0]
        exact_score = regressor.predict(input_scaled)[0]
        
        return jsonify({
            'prediction': prediction, 
            'exact_score': round(float(exact_score), 2),
            'status': 'success'
        })
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 400

@app.route('/dashboard-data', methods=['GET'])
def get_dashboard_data():
    try:
        # Load raw data to generate insights
        data_path = os.path.join(os.path.dirname(__file__), 'Mall_Customers.csv')
        df = pd.read_csv(data_path)
        
        # 1. Scatter Plot Data (Income vs Spending clustering view format)
        scatter_data = []
        for _, row in df.iterrows():
            # Classify points for colored scattered dots
            score = row['Spending Score (1-100)']
            segment = "High" if score >= 67 else "Medium" if score >= 34 else "Low"
            scatter_data.append({
                'id': row['CustomerID'],
                'income': row['Annual Income (k$)'],
                'spending': score,
                'age': row['Age'],
                'segment': segment
            })
            
        # 2. Correlation Heatmap Data
        df_numeric = pd.get_dummies(df, columns=['Gender'], drop_first=True)
        # Calculate Pearson Correlation
        corr_matrix = df_numeric[['Age', 'Annual Income (k$)', 'Spending Score (1-100)', 'Gender_Male']].corr()
        
        # Format for React easily readable nested array or structured list
        heatmap_data = []
        features = ['Age', 'Annual Income (k$)', 'Spending Score (1-100)', 'Gender_Male']
        for row_idx, r_feat in enumerate(features):
            for col_idx, c_feat in enumerate(features):
                heatmap_data.append({
                    'x': c_feat.replace(' (k$)', '').replace(' (1-100)', '').replace('_Male', ''),
                    'y': r_feat.replace(' (k$)', '').replace(' (1-100)', '').replace('_Male', ''),
                    'value': round(corr_matrix.loc[r_feat, c_feat], 2),
                    'xIdx': col_idx,
                    'yIdx': row_idx
                })

        return jsonify({
            'scatter_data': scatter_data,
            'heatmap_data': heatmap_data,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
