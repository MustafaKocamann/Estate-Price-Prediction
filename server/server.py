from flask import Flask, request, jsonify, send_from_directory
import util
import os

# Get absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CLIENT_DIR = os.path.join(BASE_DIR, '..', 'client')

app = Flask(__name__, static_folder=CLIENT_DIR, static_url_path='')

def add_cors_headers(response):
    """Add CORS headers to response"""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return response

@app.after_request
def after_request(response):
    return add_cors_headers(response)

@app.route('/', methods=['GET'])
def home():
    """Serve main HTML file"""
    try:
        with open(os.path.join(CLIENT_DIR, 'app.html'), 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"<h1>Error: {str(e)}</h1><p>Client folder: {CLIENT_DIR}</p>", 500

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files (CSS, JS, etc)"""
    try:
        filepath = os.path.join(CLIENT_DIR, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                if filename.endswith('.css'):
                    return content, 200, {'Content-Type': 'text/css'}
                elif filename.endswith('.js'):
                    return content, 200, {'Content-Type': 'application/javascript'}
                else:
                    return content
        else:
            return f"File not found: {filepath}", 404
    except Exception as e:
        return f"Error: {str(e)}", 500

@app.route('/api/get_location_names', methods=['GET', 'OPTIONS'])
def get_location_names():
    """API endpoint to get all available location names"""
    try:
        response = jsonify({
            'locations': util.get_location_names()
        })
        return response, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict_home_price', methods=['GET', 'POST', 'OPTIONS'])
def predict_home_price():
    """API endpoint to predict home price based on features"""
    try:
        total_sqft = float(request.form.get('total_sqft', 0))
        location = request.form.get('location', '')
        bhk = int(request.form.get('bhk', 0))
        bath = int(request.form.get('bath', 0))
        
        # Validate inputs
        if total_sqft <= 0 or bhk <= 0 or bath <= 0 or not location:
            return jsonify({'error': 'Invalid input parameters'}), 400
        
        estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)
        
        response = jsonify({
            'estimated_price': estimated_price,
            'location': location,
            'total_sqft': total_sqft,
            'bhk': bhk,
            'bath': bath
        })
        return response, 200
    except ValueError:
        return jsonify({'error': 'Invalid input format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    print("="*60)
    print("Starting PropertyPredict - Price Prediction Server")
    print("="*60)
    util.load_saved_artifacts()
    print("\n✓ Server initialized successfully")
    print("📍 Running on http://127.0.0.1:5000")
    print("🌐 Open in browser: http://127.0.0.1:5000")
    print("="*60)
    app.run(debug=True, host='127.0.0.1', port=5000)