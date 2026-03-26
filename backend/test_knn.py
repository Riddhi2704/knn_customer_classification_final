import joblib
import pandas as pd
import os

model_path = os.path.join(os.path.dirname(__file__), 'knn_model.pkl')
scaler_path = os.path.join(os.path.dirname(__file__), 'scaler.pkl')
regressor_path = os.path.join(os.path.dirname(__file__), 'knn_reg_model.pkl')

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)
regressor = joblib.load(regressor_path)

def test_predict(age, income, gender_male):
    input_data = pd.DataFrame([[age, income, gender_male]], 
                              columns=['Age', 'Annual Income (k$)', 'Gender_Male'])
    input_scaled = scaler.transform(input_data)
    prediction = model.predict(input_scaled)[0]
    exact_score = regressor.predict(input_scaled)[0]
    print(f"Input: Age={age}, Income={income}, GenderMale={gender_male} -> Class={prediction}, RegressorScore={exact_score}")

# Test Low 1
test_predict(20, 16, 0.0)
# Test Low 2
test_predict(64, 19, 1.0)

# Test High 1
test_predict(23, 16, 0.0)
# Test High 2
test_predict(21, 15, 1.0)
