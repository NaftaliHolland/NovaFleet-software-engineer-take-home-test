# NovaFleet Software Engineer - Test
This is an API I built for a take home assesment for the role of Software Engineer at NovaFleet

## Technical Requirements
## Part 1 - Backend API
### Data Model - Inspection
*Fields*
- `vehicle_plate` (string, required) - Example: "ABC-1234"
- `inspection_date` (date, required) - Example: "2024-12-25"
- `status` (string, required) - Must be exactly one of: "scheduled", "passed", "failed"
- `notes` (string, optional) - Example: "Brakes need servicing"

### API Endpoints
1. POST /api/inspections - Creates a new inspection record
2. GET /api/inspections - Returns all inspection records
3. GET /api/inspections/{id} - Returns a single inspection by its ID
4. PUT /api/inspections/{id} - Updates an existing inspection

### Business rules
*Validation*
1. Reject any inspection with an `inspection_date` that is in the past
2. Ensure the `status` filed only accepts "scheduled", "passed", or "failed"
3. Return appropriate error messages when validation fails


### Testing
*Automated tests*
1. Test successful inspection creation with valid data
2. Test that inspection with past dates are rejected


## Part 2 - Frontend
A basic web interface that includes:
1. A form with fields for vehicle plate, inspection date, and status
2. A list displaying all saved inspections
3. Basic styling

## Part 3 - Documentation
README.md should include:
1. Step-by-step instructions to run the application
2. Description of any challenges I encountered during development
3. List of features I would add with additional time

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/NaftaliHolland/NovaFleet-software-engineer-take-home-test.git
cd NovaFleet-software-engineer-take-home-test
```

### 2. Backend Setup (Django)

```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate

*Seed some dummy data*
python manage.py seed_inspections
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

### 3. Frontend Setup (React + Vite)

Open a **new terminal** and run:

```bash
cd client
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Testing
```bash
cd server
source venv/bin/activate
python manage.py test
```

