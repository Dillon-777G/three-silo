from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os




app = Flask(__name__)
CORS(app)

# Initialize the OpenAI client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


#This Python script defines a Flask web server with an endpoint /chat that handles POST requests. 
# When a message is received, it extracts the user's message from the request, prints it for logging,
# and then sends this message to the OpenAI GPT-3.5-turbo model using the OpenAI API.
@app.route('/chat', methods=['POST'])
def chat_endpoint():
    user_message = request.json['message']
    print("Received message:", user_message)

    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": user_message}],
            model="gpt-3.5-turbo",
        )

        # Correctly accessing the response
        reply = chat_completion.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
