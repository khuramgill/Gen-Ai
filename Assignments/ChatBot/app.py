from flask import Flask, request, jsonify, send_from_directory
import openai

app = Flask(__name__)

openai.api_key = 'api-key-here'

def generate_response(user_input):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant for psychological assessment, and your name is Agile. You are helping a user with their mental health.if user will ask any other questions not related to mental health, you can say 'I am here to help you with your mental health. Please ask me questions related to mental health.'"},
            {"role": "user", "content": user_input}
        ]
    )
    return response.choices[0].message['content']

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response_text = generate_response(user_input)
    return jsonify({'response': response_text})

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
