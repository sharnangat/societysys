# Login API cURL Examples

## API Endpoint

```
POST http://localhost:3000/api/login
Content-Type: application/json
```

## Required Fields

- `email` (string, valid email format)
- `password` (string, plain text password)

## Basic Login (cURL - Linux/Mac)

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.user@example.com",
    "password": "testpassword123"
  }'
```

## PowerShell (Windows)

```powershell
$body = @{
    email = "test.user@example.com"
    password = "testpassword123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/login" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
```

## With Pretty Print (jq on Linux/Mac)

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.user@example.com",
    "password": "testpassword123"
  }' | jq .
```

## Save Token to File

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.user@example.com",
    "password": "testpassword123"
  }' | jq -r '.token' > token.txt
```

## Using Token in Subsequent Requests

```bash
# First, login and save token
TOKEN=$(curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.user@example.com",
    "password": "testpassword123"
  }' | jq -r '.token')

# Use token for authenticated requests
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN"
```

## Expected Success Response (200)

```json
{
  "user": {
    "id": "uuid-here",
    "email": "test.user@example.com",
    "first_name": "Test",
    "last_name": "User",
    "phone": "1234567890",
    "status": "pending_verification",
    "email_verified": false,
    "phone_verified": false,
    "created_at": "2025-12-11T...",
    "updated_at": "2025-12-11T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Error Responses

**401 Unauthorized (Invalid credentials):**
```json
{
  "message": "Invalid email or password"
}
```

**423 Locked (Account locked):**
```json
{
  "message": "Account is locked. Please try again later."
}
```

**400 Bad Request (Missing fields):**
```json
{
  "message": "Email and password are required"
}
```

## Password Verification

The login API:
1. Finds user by email
2. Retrieves `password_hash` from database
3. Uses `bcrypt.compare()` to verify the password
4. If match: Returns user data and JWT token
5. If no match: Increments failed login attempts, locks after 5 attempts

## Testing

### Using Node.js Script
```bash
node scripts/testLoginAPI.js
```

### Using PowerShell Script
```powershell
.\scripts\curlLoginUser.ps1
```

### Using Bash Script
```bash
bash scripts/curlLoginUser.sh
```

## Notes

- Password is sent as **plain text** (will be compared with hashed password in database)
- Token expires in 7 days (default)
- Failed login attempts are tracked and account locks after 5 attempts
- Account lock duration: 1 hour

