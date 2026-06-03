# Neti Academy Backend & Admin Panel: Agile Task Master List

This is the comprehensive Agile Task list designed to be copied directly into Microsoft Excel or Google Sheets. It is categorized by Epics, Stories, and Tasks, complete with difficulty rankings, hourly estimations, timelines, and technical definitions.

---

## Copy-Paste Ready Table (Clean for Excel)

| Epic | Task ID | Task Classification | Task Name and Core Technical Action | Difficulty | Est. Hours | Target Component | Status |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- | :---: |
| Project Setup & Auth | Auth-1.1 | Task | Initialize Django backend, configure .venv, install key libraries (django, djangorestframework, djangorestframework-simplejwt, django-cors-headers, django-environ). | Easy | 2 | Setup / Settings | [ ] |
| Project Setup & Auth | Auth-1.2 | Task | Create custom User model inheriting from AbstractUser and register AUTH_USER_MODEL in settings.py. | Medium | 2 | models.py | [ ] |
| Project Setup & Auth | Auth-1.3 | Story | User Registration: Build backend DRF RegisterSerializer with custom field validation. Endpoints: POST /api/auth/register/. | Medium | 3 | views.py / serializers.py | [ ] |
| Project Setup & Auth | Auth-1.4 | Story | User Secure Login: Configure SimpleJWT to issue access and refresh tokens. Include user details in custom JWT claims. Endpoints: POST /api/auth/login/. | Medium | 3 | JWT Config | [ ] |
| Project Setup & Auth | Auth-1.5 | Story | User Logout: Configure SimpleJWT blacklist app to invalidate active refresh tokens. Endpoints: POST /api/auth/logout/. | Easy | 2 | views.py | [ ] |
| Project Setup & Auth | Auth-1.6 | Story | React Auth Client Integration: Set up JWT token context, local storage persistence, automatic Axios interceptors for refreshing access tokens, and protected routing. | Hard | 8 | React Context / Routing | [ ] |
| Test Engine API | Test-2.1 | Task | Define core Test and Question DB models. Write dynamic fields (such as options as a JSONField to handle any option size). Run initial migrations. | Easy | 2 | models.py | [ ] |
| Test Engine API | Test-2.2 | Story | Student View Tests List: Write endpoint returning summaries of all tests. Endpoints: GET /api/tests/. | Easy | 2 | views.py | [ ] |
| Test Engine API | Test-2.3 | Story | Student Start Assessment: Endpoint returning questions with option text while suppressing correct answers/explanations to prevent dev-console cheating. Endpoints: POST /api/tests/id/start/. | Medium | 4 | views.py / serializers.py | [ ] |
| Test Engine API | Test-2.4 | Story | Student Grading & Explanation: Endpoint receiving option sheet, checking answers, updating score and percentage, and returning correct solutions with explanations. Endpoints: POST /api/tests/id/submit/. | Hard | 6 | views.py / Grading Logic | [ ] |
| Test Engine API | Test-2.5 | Story | React Test Client Integration: Build timed, fullscreen assessment dashboard. Auto-locks, saves selected indexes, handles auto-submit on timer end, and displays score summary page. | Hard | 10 | React Page / Hook | [ ] |
| CSV Parser & Admin API | CSV-3.1 | Task | Write atomic parsing utility in Python that reads uploaded CSV buffers, validates columns, and uses transaction.atomic() to guarantee all-or-nothing database writes. | Medium | 4 | utils/csv_parser.py | [ ] |
| CSV Parser & Admin API | CSV-3.2 | Story | Admin Bulk Question Upload: API view for staff users to post CSV file wrapper for a test. Endpoints: POST /api/admin/tests/id/upload-csv/. | Medium | 4 | views.py / Admin API | [ ] |
| CSV Parser & Admin API | CSV-3.3 | Story | React Admin CSV UI: Drag-and-drop file panel with real-time parser response feedback (displays successfully created counts or row numbers of formatting errors). | Medium | 6 | React component | [ ] |
| CSV Parser & Admin API | CSV-3.4 | Story | CSV Append vs Overwrite: Build toggle in upload endpoint and React UI to let admins choose whether to append questions or completely replace existing questions. | Easy | 2 | UI / API Logic | [ ] |
| Admin Test Dashboard | Admin-4.1 | Task | DRF Admin CRUD ViewSet: Write question models manager restricted to admin/staff users. Endpoints: POST/PUT/DELETE /api/admin/questions/ | Easy | 3 | views.py / Permissions | [ ] |
| Admin Test Dashboard | Admin-4.2 | Story | React Question Dashboard: Interactive table displaying all questions of a test, with single row forms for manual editing, appending questions, or row deletion. | Medium | 8 | React Page / Forms | [ ] |
| Admin Test Dashboard | Admin-4.3 | Task | Admin Image Storage Pipeline: Configure media handling path in settings.py and write multipart upload endpoints for uploading blog banners or topic pictures. | Medium | 4 | Settings / Storage | [ ] |
| Admin Test Dashboard | Admin-4.4 | Story | Admin Candidate Scoreboard: Build analytics dashboard for staff to view and filter candidate test attempts, percentage scores, and timestamps. | Medium | 5 | API View / React View | [ ] |
| Admin Content Panel | Cont-5.1 | Task | Setup models for Daily Digests, Topics, and Blogs based on Neti front-end schema structures. Run migrations. | Medium | 4 | models.py | [ ] |
| Admin Content Panel | Cont-5.2 | Story | Admin Current Affairs API: Write transactional CRUD backend for Daily Digests, Topics, and Practice MCQs. Endpoints: /api/admin/current-affairs/ | Medium | 6 | views.py / serializers.py | [ ] |
| Admin Content Panel | Cont-5.3 | Story | Admin Blog API: REST model CRUD for published Neti Mind blogs. Endpoints: /api/admin/blogs/ | Easy | 2 | views.py | [ ] |
| Admin Content Panel | Cont-5.4 | Story | React Content Panel Integration: Set up rich-text or markdown editors for writing and publishing blogs/current affairs directly from your custom admin views. | Hard | 12 | React Page / Rich Editor | [ ] |
| Migration & API Swap | Sync-6.1 | Task | Write an idempotent Python import script to read the existing 776KB front-end JS arrays and insert all history cleanly into the Django database. | Medium | 6 | Data Migration Script | [ ] |
| Migration & API Swap | Sync-6.2 | Story | Front-end Data Integration: Swap static file paths on home page, current affairs feeds, and blog pages with active backend API requests. | Medium | 5 | React integration | [ ] |

---

## Summary Metrics for Project Scheduling
- Total Number of Tasks: 25 Tasks / Stories
- Total Estimated Development Effort: 105 Hours (~2.5 - 3 Weeks of single-developer delivery)
- Difficulty Breakdown:
  - Easy: 8 Tasks
  - Medium: 13 Tasks
  - Hard: 4 Tasks
