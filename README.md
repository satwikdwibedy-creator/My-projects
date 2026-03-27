Content Monitoring System (Django + DRF)
📌 Overview

This project is a content monitoring system that scans content items for predefined keywords and flags relevant matches based on scoring logic.

🚀 Features
Add and manage keywords
Add and manage content items
Automatic keyword matching
Scoring system:
100 → exact title match
70 → keyword in title
40 → keyword in body
Suppression logic:
Avoid duplicate flags
Re-flag if content updated
REST APIs using Django REST Framework
Admin panel for easy management
🛠 Tech Stack
Python
Django
Django REST Framework
SQLite (default DB)
⚙️ Setup Instructions
Clone the repo:
git clone <your-repo-link>
cd content_monitoring
Install dependencies:
pip install django djangorestframework
Run migrations:
python manage.py migrate
Start server:
python manage.py runserver
Open:
API → http://127.0.0.1:8000/
Admin → http://127.0.0.1:8000/admin/
📡 API Endpoints
Endpoint	Method	Description
/keywords/	GET, POST	Manage keywords
/flags/	GET, POST	View flags
/scan/	POST	Run content scan
🧪 Example Workflow
Add keywords via admin
Add content items
Call /scan/ (POST)
Check /flags/ for results
📈 Future Improvements
Add authentication
Add pagination
Improve matching using NLP
Add frontend UI
