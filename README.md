<div align="center">

# 🏠 Estate Price Prediction - Bangalore

### AI-Powered Real Estate Price Estimation System

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)](https://flask.palletsprojects.com/)
[![Machine Learning](https://img.shields.io/badge/ML-Scikit--Learn-orange.svg)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Demo](#-demo) •
[Features](#-features) •
[Installation](#-installation) •
[Usage](#-usage) •
[Technologies](#-technologies) •
[Contributing](#-contributing)

<img src="https://user-images.githubusercontent.com/placeholder/banner.png" alt="Project Banner" width="800"/>

</div>

---

## 📖 Overview

**Estate Price Prediction** is a sophisticated full-stack machine learning application that predicts real estate prices in Bangalore, India. Using advanced regression algorithms trained on 13,000+ property records, the system provides instant, accurate price estimations across 280+ locations.

### 🎯 Key Highlights

- 🤖 **Machine Learning Model**: Linear Regression with 84% accuracy
- 📊 **Advanced Analytics**: Interactive dashboard with Chart.js visualizations
- 🌐 **Modern UI/UX**: Responsive design with Bootstrap 5
- ⚡ **Real-time API**: Flask-powered RESTful backend
- 📱 **Mobile Friendly**: Fully responsive across all devices

---

## ✨ Features

### 🔮 Price Prediction Engine
- Instant property price estimation
- Support for 1-5 BHK configurations
- 280+ verified Bangalore locations
- Price per square feet analysis

### 📈 Analytics Dashboard
- **Interactive Charts**: Real-time data visualizations
- **Market Insights**: Location-wise price trends
- **BHK Analysis**: Bedroom-wise price distribution
- **Area Correlation**: Price vs. square feet analysis

### 🎨 User Interface
- Modern, professional design
- Gradient backgrounds and smooth animations
- Input validation and error handling
- Loading states and user feedback
- Dark-mode navbar

### ⚙️ Technical Features
- RESTful API architecture
- CORS-enabled endpoints
- Comprehensive error handling
- Model persistence with pickle
- JSON-based data columns

---

## 🚀 Demo

### Price Prediction Interface
<img src="https://user-images.githubusercontent.com/placeholder/prediction-screenshot.png" alt="Price Prediction" width="700"/>

### Analytics Dashboard
<img src="https://user-images.githubusercontent.com/placeholder/analytics-screenshot.png" alt="Analytics Dashboard" width="700"/>

---

## 🛠️ Technologies

<table>
<tr>
<td valign="top" width="50%">

### Backend
- ![Python](https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=white) **Python 3.11+**
- ![Flask](https://img.shields.io/badge/-Flask-000000?style=flat&logo=flask&logoColor=white) **Flask** - Web framework
- ![Scikit-Learn](https://img.shields.io/badge/-Scikit--Learn-F7931E?style=flat&logo=scikit-learn&logoColor=white) **Scikit-Learn** - ML library
- ![Pandas](https://img.shields.io/badge/-Pandas-150458?style=flat&logo=pandas&logoColor=white) **Pandas** - Data manipulation
- ![NumPy](https://img.shields.io/badge/-NumPy-013243?style=flat&logo=numpy&logoColor=white) **NumPy** - Numerical computing

</td>
<td valign="top" width="50%">

### Frontend
- ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5**
- ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS3** with custom animations
- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **JavaScript (ES6+)**
- ![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white) **Bootstrap 5**
- ![Chart.js](https://img.shields.io/badge/-Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white) **Chart.js** - Data visualization

</td>
</tr>
</table>

---

## 📦 Installation

### Prerequisites

- Python 3.11 or higher
- pip (Python package manager)
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/MustafaKocamann/Estate-Price-Prediction.git
cd Estate-Price-Prediction
```

### Step 2: Create Virtual Environment

```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Verify Installation

```bash
python server/util.py
```

Expected output: Location names and test predictions

---

## 🎮 Usage

### Starting the Server (Local Development)

```bash
cd server
python server.py
```

The application will be available at: **http://127.0.0.1:5000**

### 🚀 Deploy to Render

1. **Fork/Push to GitHub**
2. **Go to [Render Dashboard](https://dashboard.render.com/)**
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure:**
   - **Name:** estate-price-prediction
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn --chdir server server:app`
   - **Instance Type:** Free
6. **Click "Create Web Service"**

Your app will be live at: `https://estate-price-prediction.onrender.com`

### API Endpoints

#### 1. Get Location Names
```http
GET /api/get_location_names
```

**Response:**
```json
{
  "locations": ["Whitefield", "Electronic City", "Marathahalli", ...]
}
```

#### 2. Predict Home Price
```http
POST /api/predict_home_price
```

**Request Body:**
```
total_sqft: 1500
bhk: 2
bath: 2
location: Whitefield
```

**Response:**
```json
{
  "estimated_price": 95.43,
  "location": "Whitefield",
  "total_sqft": 1500,
  "bhk": 2,
  "bath": 2
}
```

---

## 📊 Project Structure

```
Estate-Price-Prediction/
│
├── 📁 client/                      # Frontend files
│   ├── app.html                   # Main prediction page
│   ├── app.css                    # Stylesheet
│   ├── app.js                     # JavaScript logic
│   ├── analytics.html             # Dashboard page
│   └── analytics.js               # Chart.js visualizations
│
├── 📁 server/                      # Backend files
│   ├── server.py                  # Flask application
│   ├── util.py                    # Utility functions
│   └── 📁 artifacts/              # Model files
│       ├── banglore_home_prices_model.pickle
│       └── columns.json
│
├── exercise.ipynb                 # ML model training notebook
├── Bengaluru_House_Data.csv      # Dataset
├── requirements.txt               # Python dependencies
└── README.md                      # This file
```

---

## 🧠 Machine Learning Pipeline

### 1. Data Preprocessing
- **Data Cleaning**: Removed 3,000+ incomplete records
- **Feature Engineering**: Created BHK and price_per_sqft columns
- **Outlier Removal**: Eliminated anomalies using statistical methods
- **Dimensionality Reduction**: Location encoding with one-hot encoding

### 2. Model Training
```python
# Linear Regression Model
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)

# Cross-Validation Score: 84%
```

### 3. Model Selection
- **Algorithms Tested**: Linear Regression, Lasso, Decision Tree
- **Best Model**: Linear Regression (R² = 0.84)
- **Validation**: 5-fold cross-validation

---

## 📈 Performance Metrics

| Metric | Value |
|--------|-------|
| R² Score | 0.84 |
| Training Data | 13,320 properties |
| Features | 244 (after encoding) |
| Locations Covered | 282 |
| Prediction Time | <100ms |

---

## 🎨 UI/UX Features

### Design Philosophy
- **Color Scheme**: Professional blue (#1e3c72) with cyan accents (#00b4d8)
- **Typography**: Poppins (modern), Playfair Display (elegant)
- **Animations**: Smooth transitions and slide-in effects
- **Responsive**: Mobile-first approach

### Key Components
- ✅ Input validation
- ✅ Loading spinners
- ✅ Error messages
- ✅ Success notifications
- ✅ Responsive design
- ✅ Accessibility features

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mustafa Kocaman**

- GitHub: [@MustafaKocamann](https://github.com/MustafaKocamann)
- LinkedIn: [Mustafa Kocaman](https://linkedin.com/in/mustafa-kocaman)

---

## 🙏 Acknowledgments

- Dataset source: Kaggle - Bangalore House Price Data
- Icons: Font Awesome
- Charts: Chart.js
- UI Framework: Bootstrap 5
- ML Library: Scikit-Learn

---

## 📞 Support

For support, email mustafakocaman@example.com or create an issue in this repository.

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ and ☕ by Mustafa Kocaman

</div>
