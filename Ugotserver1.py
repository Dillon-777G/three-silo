from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import aiplatform
import vertexai
from vertexai.language_models import ChatModel, InputOutputTextPair, ChatSession

app = Flask(__name__)
CORS(app)



vertexai.init(project="glutenizer420", location="us-central1")
chat_model = ChatModel.from_pretrained("chat-bison")
parameters = {
    "max_output_tokens": 1000,
    "temperature": 0.2,
    "top_p": 0.8,
    "top_k": 40
}
@app.route('/chat', methods=['POST'])
def chat_endpoint():
    user_message = request.json['message']
    
    chat = chat_model.start_chat(
        context="You are a chef that specializes in designing recipes and diet plans which are vegan and gluten free. You will provide recipes as well as advice on meal prepping. When asked for a weekly meal plan, you will provide breakfast, lunch, and dinner options for each weekday. After someone tells you their dietary restrictions you will immediately respond with a meal plan or recipe."
    )
    try:
        response = chat.send_message(user_message)
        print(response.text)
        return jsonify({"reply": response.text})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
