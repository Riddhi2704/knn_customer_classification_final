import pandas as pd
import numpy as np

file_path = 'Mall_Customers.csv'

# Read existing 30 records
df = pd.read_csv(file_path)
df_original = df.head(30) # Keep only the original 30 to replace the random 2000

last_id = df_original['CustomerID'].max()
if pd.isna(last_id):
    last_id = 0

# Generate 2000 new highly correlated records
n_records = 2000
new_ids = range(int(last_id) + 1, int(last_id) + 1 + n_records)
new_genders = np.random.choice(['Male', 'Female'], n_records)

# Create 3 distinct clusters to ensure KNN works perfectly
# Cluster 1: High Spending (Score 67-100) -> Young, High Income
# Cluster 2: Medium Spending (Score 34-66) -> Mid Age, Mid Income
# Cluster 3: Low Spending (Score 1-33) -> Older, Low Income

new_ages = []
new_incomes = []
new_scores = []

for _ in range(n_records):
    rand = np.random.rand()
    if rand < 0.33: # High
        new_ages.append(np.random.randint(18, 35))
        new_incomes.append(np.random.randint(70, 150))
        new_scores.append(np.random.randint(67, 100))
    elif rand < 0.66: # Medium
        new_ages.append(np.random.randint(35, 50))
        new_incomes.append(np.random.randint(40, 69))
        new_scores.append(np.random.randint(34, 66))
    else: # Low
        new_ages.append(np.random.randint(50, 71))
        new_incomes.append(np.random.randint(15, 39))
        new_scores.append(np.random.randint(1, 33))

new_data = pd.DataFrame({
    'CustomerID': new_ids,
    'Gender': new_genders,
    'Age': new_ages,
    'Annual Income (k$)': new_incomes,
    'Spending Score (1-100)': new_scores
})

df_combined = pd.concat([df_original, new_data], ignore_index=True)
df_combined.to_csv(file_path, index=False)
print(f"Successfully replaced and added 2000 perfectly clustered records. Total records now: {len(df_combined)}")
