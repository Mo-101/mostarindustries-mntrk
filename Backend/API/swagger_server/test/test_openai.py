import unittest
from swagger_server.util.openai_service import generate_response # type: ignore

class TestOpenAI(unittest.TestCase):
    def test_generate_response(self):
        prompt = "Write a short poem about the stars."
        result = generate_response(prompt)
        self.assertTrue(len(result) > 0)
