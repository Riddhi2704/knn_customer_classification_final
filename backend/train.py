import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# 1. Data Gathering
df = pd.read_csv('Mall_Customers.csv')

# 2. Data Preprocessing & Outliers (using IQR)
for col in ['Age', 'Annual Income (k$)']:
    Q1 = df[col].quantile(0.25)
    Q3 = df[col].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    df = df[(df[col] >= lower_bound) & (df[col] <= upper_bound)]

# Convert Spending Score into Classification Bins
bins = [0, 33, 66, 100]
labels = ['Low', 'Medium', 'High']
df['Spending_Class'] = pd.cut(df['Spending Score (1-100)'], bins=bins, labels=labels)

# 3. One-Hot Encoding
df = pd.get_dummies(df, columns=['Gender'], drop_first=True)

# 4. Features & Target
X = df[['Age', 'Annual Income (k$)', 'Gender_Male']]
y = df['Spending_Class']

# 5. Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 6. Standard Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 7 & 8. KNN Fit (Classification) & Hyperparameter Tuning
param_grid = {
    'n_neighbors': np.arange(1, 21),
    'weights': ['uniform', 'distance'],
    'metric': ['euclidean', 'manhattan']
}
knn = KNeighborsClassifier()
grid_search = GridSearchCV(knn, param_grid, cv=5, scoring='accuracy')
grid_search.fit(X_train_scaled, y_train)

# Train Regressor for Exact Score
from sklearn.neighbors import KNeighborsRegressor
y_reg = df['Spending Score (1-100)']
X_train_reg, X_test_reg, y_train_reg, y_test_reg = train_test_split(X, y_reg, test_size=0.2, random_state=42)

# Prevent heavy smoothing to the mean by limiting k and strictly using distance weights
param_grid_reg = {
    'n_neighbors': np.arange(1, 6), # Small K to allow extreme values
    'weights': ['distance'], # Distance weighting prevents flat averaging
    'metric': ['euclidean', 'manhattan']
}
knn_reg = KNeighborsRegressor()
grid_search_reg = GridSearchCV(knn_reg, param_grid_reg, cv=5, scoring='neg_mean_squared_error')
grid_search_reg.fit(X_train_scaled, y_train_reg)

# Evaluate and Save
best_model = grid_search.best_estimator_
best_model_reg = grid_search_reg.best_estimator_

predictions = best_model.predict(X_test_scaled)
predictions_reg = best_model_reg.predict(X_test_scaled)

print("Best Parameters (Classification):", grid_search.best_params_)
print("Accuracy:", accuracy_score(y_test, predictions))
print("\nClassification Report:\n", classification_report(y_test, predictions))

joblib.dump(best_model, 'knn_model.pkl')
joblib.dump(best_model_reg, 'knn_reg_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("Model and scaler saved successfully.")
