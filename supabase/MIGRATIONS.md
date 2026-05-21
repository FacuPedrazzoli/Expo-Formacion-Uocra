# Supabase Schema Documentation

## Overview

PostgreSQL schema for Expo Formación UOCRA application with Row Level Security (RLS) enabled.

---

## Tables

### 1. events

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| year | INTEGER | NOT NULL, UNIQUE |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| location | VARCHAR(255) | |
| date | DATE | NOT NULL |
| active | BOOLEAN | DEFAULT false |
| registration_open | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

**Constraints:**
- `events_year_unique`: UNIQUE(year)

**Triggers:**
- `trigger_enforce_single_active_event`: Ensures only one event is active at a time
- `trigger_update_events_updated_at`: Auto-updates updated_at on row update

**Indexes:**
- `idx_events_active`: Partial index on (active) WHERE active = true

---

### 2. users

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| event_id | UUID | NOT NULL, REFERENCES events(id) ON DELETE CASCADE |
| dni | VARCHAR(20) | NOT NULL |
| name | VARCHAR(100) | NOT NULL |
| lastname | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | NOT NULL |
| phone | VARCHAR(20) | |
| user_type | VARCHAR(20) | NOT NULL, DEFAULT 'web', CHECK (IN ('manual', 'web')) |
| has_qr | BOOLEAN | DEFAULT false |
| qr_code | VARCHAR(255) | |
| checked_in | BOOLEAN | DEFAULT false |
| checked_in_at | TIMESTAMPTZ | |
| how_found_id | UUID | REFERENCES how_found(id) |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

**Constraints:**
- `users_event_dni_unique`: UNIQUE(event_id, dni)

**Triggers:**
- `trigger_update_users_updated_at`: Auto-updates updated_at on row update

**Indexes:**
- `idx_users_event_id`: ON (event_id)
- `idx_users_dni`: ON (dni)
- `idx_users_event_dni`: ON (event_id, dni)
- `idx_users_checked_in`: Partial index ON (event_id, checked_in) WHERE checked_in = true
- `idx_users_email`: ON (email)
- `idx_users_type`: ON (event_id, user_type)

---

### 3. how_found

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| label | VARCHAR(100) | NOT NULL |
| active | BOOLEAN | DEFAULT true |
| sort_order | INTEGER | DEFAULT 0 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

**Indexes:**
- `idx_how_found_active`: Partial index ON (active) WHERE active = true

---

### 4. talks

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| event_id | UUID | NOT NULL, REFERENCES events(id) ON DELETE CASCADE |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| speaker_name | VARCHAR(150) | |
| speaker_bio | TEXT | |
| start_time | TIMESTAMPTZ | NOT NULL |
| end_time | TIMESTAMPTZ | NOT NULL |
| capacity | INTEGER | NOT NULL, CHECK (capacity > 0) |
| room | VARCHAR(100) | |
| is_virtual | BOOLEAN | DEFAULT false |
| virtual_link | VARCHAR(500) | |
| active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

**Triggers:**
- `trigger_update_talks_updated_at`: Auto-updates updated_at on row update

**Indexes:**
- `idx_talks_event_id`: ON (event_id)
- `idx_talks_start_time`: ON (event_id, start_time)
- `idx_talks_active`: Partial index ON (event_id, active) WHERE active = true

---

### 5. talk_registrations

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| user_id | UUID | NOT NULL, REFERENCES users(id) ON DELETE CASCADE |
| talk_id | UUID | NOT NULL, REFERENCES talks(id) ON DELETE CASCADE |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

**Constraints:**
- `talk_registrations_user_talk_unique`: UNIQUE(user_id, talk_id)

**Indexes:**
- `idx_talk_registrations_user`: ON (user_id)
- `idx_talk_registrations_talk`: ON (talk_id)

---

### 6. survey_questions

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| event_id | UUID | NOT NULL, REFERENCES events(id) ON DELETE CASCADE |
| question | VARCHAR(500) | NOT NULL |
| question_type | VARCHAR(20) | NOT NULL, CHECK (IN ('rating', 'select', 'text', 'boolean')) |
| options | JSONB | DEFAULT '[]'::jsonb |
| required | BOOLEAN | DEFAULT false |
| sort_order | INTEGER | DEFAULT 0 |
| active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

**Indexes:**
- `idx_survey_questions_event`: ON (event_id)
- `idx_survey_questions_active`: Partial index ON (event_id, active) WHERE active = true

---

### 7. survey_answers

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| event_id | UUID | NOT NULL, REFERENCES events(id) ON DELETE CASCADE |
| user_id | UUID | REFERENCES users(id) ON DELETE SET NULL |
| dni | VARCHAR(20) | NOT NULL |
| answers | JSONB | NOT NULL |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

**Constraints:**
- `survey_answers_event_dni_unique`: UNIQUE(event_id, dni)

**Indexes:**
- `idx_survey_answers_event`: ON (event_id)
- `idx_survey_answers_user`: ON (user_id)

---

### 8. stands

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| event_id | UUID | NOT NULL, REFERENCES events(id) ON DELETE CASCADE |
| name | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| logo_url | TEXT | |
| image_url | TEXT | |
| website | VARCHAR(500) | |
| category | VARCHAR(100) | |
| booth_number | VARCHAR(20) | |
| sort_order | INTEGER | DEFAULT 0 |
| active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

**Triggers:**
- `trigger_update_stands_updated_at`: Auto-updates updated_at on row update

**Indexes:**
- `idx_stands_event`: ON (event_id)
- `idx_stands_category`: ON (event_id, category)

---

### 9. sponsors

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| event_id | UUID | NOT NULL, REFERENCES events(id) ON DELETE CASCADE |
| name | VARCHAR(255) | NOT NULL |
| logo_url | TEXT | |
| website | VARCHAR(500) | |
| tier | VARCHAR(20) | NOT NULL, CHECK (IN ('platinum', 'gold', 'silver', 'bronze', 'support')) |
| sort_order | INTEGER | DEFAULT 0 |
| active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

**Triggers:**
- `trigger_update_sponsors_updated_at`: Auto-updates updated_at on row update

**Indexes:**
- `idx_sponsors_event`: ON (event_id)
- `idx_sponsors_tier`: ON (event_id, tier)

---

### 10. gallery

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| event_id | UUID | NOT NULL, REFERENCES events(id) ON DELETE CASCADE |
| title | VARCHAR(255) | |
| description | TEXT | |
| image_url | TEXT | NOT NULL |
| sort_order | INTEGER | DEFAULT 0 |
| active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

**Indexes:**
- `idx_gallery_event`: ON (event_id)

---

### 11. event_content

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| event_id | UUID | NOT NULL, REFERENCES events(id) ON DELETE CASCADE |
| section | VARCHAR(50) | NOT NULL |
| title | VARCHAR(255) | |
| content | TEXT | |
| image_url | TEXT | |
| sort_order | INTEGER | DEFAULT 0 |
| active | BOOLEAN | DEFAULT true |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

**Triggers:**
- `trigger_update_event_content_updated_at`: Auto-updates updated_at on row update

**Indexes:**
- `idx_event_content_event_section`: ON (event_id, section)

---

### 12. event_stats

| Column | Type | Constraints |
|--------|------|-------------|
| event_id | UUID | PRIMARY KEY, REFERENCES events(id) ON DELETE CASCADE |
| total_registered | INTEGER | DEFAULT 0 |
| total_checked_in | INTEGER | DEFAULT 0 |
| total_surveys_completed | INTEGER | DEFAULT 0 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

---

## Row Level Security (RLS) Policies

### Public Read Policies (No Authentication Required)

| Table | Policy | Condition |
|-------|--------|-----------|
| events | Public can read active events | active = true |
| how_found | Public can read how_found | active = true |
| talks | Public can read active talks | active = true |
| stands | Public can read active stands | active = true |
| sponsors | Public can read active sponsors | active = true |
| gallery | Public can read active gallery | active = true |
| event_content | Public can read active content | active = true |
| survey_questions | Public can read active questions | active = true |

### Admin Policies (service_role Only)

All management operations require `auth.role() = 'service_role'`:

- `Admins can manage events` - ALL on events
- `Admins can manage users` - ALL on users
- `Admins can manage how_found` - ALL on how_found
- `Admins can manage talks` - ALL on talks
- `Admins can manage talk_registrations` - ALL on talk_registrations
- `Admins can manage survey_questions` - ALL on survey_questions
- `Admins can manage survey_answers` - ALL on survey_answers
- `Admins can manage stands` - ALL on stands
- `Admins can manage sponsors` - ALL on sponsors
- `Admins can manage gallery` - ALL on gallery
- `Admins can manage event_content` - ALL on event_content
- `Admins can manage event_stats` - ALL on event_stats

---

## Functions

### Business Logic Functions

1. **get_talk_capacity(talk_id UUID)** - Returns registered count, available spots, and is_full status
2. **check_talk_overlap(user_id UUID, new_talk_id UUID)** - Checks if user has schedule conflict
3. **update_event_stats(event_id UUID)** - Recalculates and updates event statistics
4. **register_user_to_talk(p_user_id, p_talk_id, p_event_id)** - Registers user with validation (capacity, overlap, duplicate)
5. **perform_checkin(p_dni TEXT, p_event_id UUID)** - Performs user check-in by DNI

### Trigger Functions

1. **enforce_single_active_event()** - Ensures only one event is active
2. **update_updated_at()** - Auto-updates updated_at timestamp

---

## Views

1. **v_active_event** - Active event with stats
2. **v_talks_with_capacity** - Talks with registration count and availability
3. **v_users_with_talks** - Users with their registered talks

---

## Storage Buckets

| Bucket | Public |
|--------|--------|
| event-images | true |
| sponsor-logos | true |
| gallery | true |

---

## Indexes Summary

| Table | Index | Type |
|-------|-------|------|
| events | idx_events_active | Partial (WHERE active = true) |
| users | idx_users_event_id | Standard |
| users | idx_users_dni | Standard |
| users | idx_users_event_dni | Standard |
| users | idx_users_checked_in | Partial (WHERE checked_in = true) |
| users | idx_users_email | Standard |
| users | idx_users_type | Standard |
| how_found | idx_how_found_active | Partial (WHERE active = true) |
| talks | idx_talks_event_id | Standard |
| talks | idx_talks_start_time | Standard |
| talks | idx_talks_active | Partial (WHERE active = true) |
| talk_registrations | idx_talk_registrations_user | Standard |
| talk_registrations | idx_talk_registrations_talk | Standard |
| survey_questions | idx_survey_questions_event | Standard |
| survey_questions | idx_survey_questions_active | Partial (WHERE active = true) |
| survey_answers | idx_survey_answers_event | Standard |
| survey_answers | idx_survey_answers_user | Standard |
| stands | idx_stands_event | Standard |
| stands | idx_stands_category | Standard |
| sponsors | idx_sponsors_event | Standard |
| sponsors | idx_sponsors_tier | Standard |
| gallery | idx_gallery_event | Standard |
| event_content | idx_event_content_event_section | Standard |

---

## Unique Constraints

| Constraint | Columns | Purpose |
|-------------|---------|---------|
| events_year_unique | year | One event per year |
| users_event_dni_unique | (event_id, dni) | One registration per person per event |
| talk_registrations_user_talk_unique | (user_id, talk_id) | One registration per user per talk |
| survey_answers_event_dni_unique | (event_id, dni) | One survey response per person per event |
