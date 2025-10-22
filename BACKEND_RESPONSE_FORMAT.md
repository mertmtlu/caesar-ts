# Backend Response Format - AI Assistant

This document describes the expected response format from the AI Assistant backend API.

## Endpoint

```
POST /api/ai/converse
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "displayText": "Explanation of what the AI is doing",
    "fileOperations": [
      {
        "operationType": "CREATE",
        "filePath": "main.py",
        "content": "def hello():\n    print('Hello World')",
        "description": "Creates the main Python script",
        "focusLine": 1
      }
    ],
    "warnings": [
      "Optional warning message"
    ]
  },
  "message": "Success",
  "errors": [],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Operation Types

The `operationType` field supports **both string and numeric formats**:

### String Format (Recommended)
```json
{
  "operationType": "CREATE",  // or "UPDATE" or "DELETE"
  "filePath": "example.py",
  "content": "...",
  "description": "Creates a new file",
  "focusLine": 1
}
```

### Numeric Format (Also Supported)
```json
{
  "operationType": 0,  // 0=CREATE, 1=UPDATE, 2=DELETE
  "filePath": "example.py",
  "content": "...",
  "description": "Creates a new file",
  "focusLine": 1
}
```

The frontend automatically normalizes both formats.

## Operation Type Mapping

| String Value | Numeric Value | Description |
|--------------|---------------|-------------|
| `"CREATE"`   | `0`           | Create a new file |
| `"UPDATE"`   | `1`           | Update an existing file |
| `"DELETE"`   | `2`           | Delete a file |

## Field Descriptions

### Required Fields

- **displayText** (string): Human-readable explanation of what the AI did or is suggesting. Shown to the user in the chat.

### Optional Fields

- **fileOperations** (array): List of file operations to apply to the editor. Each operation includes:
  - **operationType** (string | number): Type of operation (see mapping above)
  - **filePath** (string): Relative path from project root (e.g., `"src/main.py"`)
  - **content** (string): Full file content for CREATE/UPDATE operations
  - **description** (string): Human-readable description of this specific operation
  - **focusLine** (number): Line number to focus in the editor (1-indexed)

- **warnings** (array of strings): Optional warnings to display to the user

## Example Responses

### Example 1: Create a New File

```json
{
  "success": true,
  "data": {
    "displayText": "I've created a factorial calculator in main.py with error handling.",
    "fileOperations": [
      {
        "operationType": "CREATE",
        "filePath": "main.py",
        "content": "def factorial(n):\n    if n < 0:\n        raise ValueError('Negative numbers not allowed')\n    if n == 0:\n        return 1\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result\n\nif __name__ == '__main__':\n    print(factorial(5))",
        "description": "Creates the main Python script for factorial calculation",
        "focusLine": 1
      }
    ]
  }
}
```

### Example 2: Update Existing File

```json
{
  "success": true,
  "data": {
    "displayText": "I've added type hints and improved the error handling.",
    "fileOperations": [
      {
        "operationType": "UPDATE",
        "filePath": "main.py",
        "content": "def factorial(n: int) -> int:\n    if not isinstance(n, int):\n        raise TypeError('Input must be an integer')\n    if n < 0:\n        raise ValueError('Negative numbers not allowed')\n    if n == 0:\n        return 1\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result",
        "description": "Updates main.py with type hints and better error handling",
        "focusLine": 2
      }
    ],
    "warnings": [
      "This will overwrite the existing main.py file"
    ]
  }
}
```

### Example 3: Delete a File

```json
{
  "success": true,
  "data": {
    "displayText": "I've removed the temporary test file as requested.",
    "fileOperations": [
      {
        "operationType": "DELETE",
        "filePath": "temp_test.py",
        "description": "Deletes the temporary test file"
      }
    ]
  }
}
```

### Example 4: Multiple Operations

```json
{
  "success": true,
  "data": {
    "displayText": "I've created a module structure with separate files for utilities and tests.",
    "fileOperations": [
      {
        "operationType": "CREATE",
        "filePath": "utils.py",
        "content": "def add(a, b):\n    return a + b",
        "description": "Creates utilities module",
        "focusLine": 1
      },
      {
        "operationType": "CREATE",
        "filePath": "test_utils.py",
        "content": "import unittest\nfrom utils import add\n\nclass TestUtils(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(add(2, 3), 5)",
        "description": "Creates unit tests for utilities",
        "focusLine": 5
      },
      {
        "operationType": "UPDATE",
        "filePath": "main.py",
        "content": "from utils import add\n\nprint(add(5, 10))",
        "description": "Updates main.py to use the new utilities module",
        "focusLine": 1
      }
    ]
  }
}
```

### Example 5: Informational Response (No File Operations)

```json
{
  "success": true,
  "data": {
    "displayText": "This project appears to be a Python calculator application. It includes:\n- main.py: Entry point with factorial calculation\n- utils.py: Utility functions for mathematical operations\n- test_utils.py: Unit tests\n\nThe code follows PEP 8 style guidelines and includes proper error handling.",
    "fileOperations": []
  }
}
```

## Error Response

```json
{
  "success": false,
  "data": null,
  "message": "Failed to process request",
  "errors": [
    "Invalid program ID",
    "Project not found"
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Frontend Behavior

Based on the response, the frontend will:

1. **Display Message**: Show `displayText` in the chat as the AI's response
2. **Apply File Operations**: Automatically apply all `fileOperations` to the Monaco editor:
   - CREATE: Creates a new tab with the specified content
   - UPDATE: Updates the existing tab's content
   - DELETE: Closes the tab and removes the file from the editor
3. **Show Warnings**: Display any `warnings` in the message bubble
4. **Focus Editor**: Switch to the last modified file and focus on `focusLine` if specified
5. **Update UI**: Show operation badges (green for CREATE, yellow for UPDATE, red for DELETE)

## Best Practices

### For Backend Developers

1. **Always include displayText**: Even for operations, explain what you're doing
2. **Use relative paths**: File paths should be relative to project root (no leading `/`)
3. **Include full content**: For CREATE/UPDATE, always provide complete file content
4. **Set focusLine**: Help users navigate to the important part of the code
5. **Add descriptions**: Each operation should have a clear description
6. **Use warnings wisely**: Warn about destructive operations or important changes
7. **Handle errors gracefully**: Return proper error responses with helpful messages

### Example of Good Response Quality

```json
{
  "displayText": "I've refactored your code to use a class-based approach. This makes it easier to manage state and add new features. The main changes are:\n1. Created a Calculator class in calculator.py\n2. Updated main.py to use the new class\n3. Added type hints throughout",
  "fileOperations": [
    {
      "operationType": "CREATE",
      "filePath": "calculator.py",
      "content": "class Calculator:\n    \"\"\"A simple calculator class.\"\"\"\n    \n    def add(self, a: int, b: int) -> int:\n        return a + b",
      "description": "Creates Calculator class with type hints",
      "focusLine": 1
    }
  ],
  "warnings": [
    "Make sure to update any imports in other files"
  ]
}
```

## Testing

You can test the response format by sending requests to your backend:

```bash
curl -X POST http://localhost:5090/api/ai/converse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "userPrompt": "Create a hello world program",
    "programId": "your-program-id",
    "conversationHistory": []
  }'
```

The frontend will automatically handle the response and apply file operations to the editor.
