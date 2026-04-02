-- =============================================================================
-- EXPO FORMACIÓN UOCRA - PRODUCTION DATABASE SCHEMA
-- PostgreSQL + Supabase
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- TABLE: events
-- Annual events, only one can be active at a time
-- =============================================================================
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date DATE NOT NULL,
    active BOOLEAN DEFAULT false,
    registration_open BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT events_year_unique UNIQUE (year)
);

-- Index on active for quick lookup
CREATE INDEX idx_events_active ON events(active) WHERE active = true;

-- =============================================================================
-- TABLE: users
-- Event attendees - manual (with QR) or web (no QR)
-- =============================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    dni VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    user_type VARCHAR(20) NOT NULL DEFAULT 'web' CHECK (user_type IN ('manual', 'web')),
    has_qr BOOLEAN DEFAULT false,
    qr_code VARCHAR(255),
    checked_in BOOLEAN DEFAULT false,
    checked_in_at TIMESTAMP WITH TIME ZONE,
    how_found_id UUID REFERENCES how_found(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT users_event_dni_unique UNIQUE (event_id, dni)
);

-- Indexes for performance
CREATE INDEX idx_users_event_id ON users(event_id);
CREATE INDEX idx_users_dni ON users(dni);
CREATE INDEX idx_users_event_dni ON users(event_id, dni);
CREATE INDEX idx_users_checked_in ON users(event_id, checked_in) WHERE checked_in = true;
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(event_id, user_type);

-- =============================================================================
-- TABLE: how_found
-- Registration source options (managed by admin)
-- =============================================================================
CREATE TABLE how_found (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(100) NOT NULL,
    active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_how_found_active ON how_found(active) WHERE active = true;

-- =============================================================================
-- TABLE: talks
-- Scheduled talks with capacity limits
-- =============================================================================
CREATE TABLE talks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    speaker_name VARCHAR(150),
    speaker_bio TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    room VARCHAR(100),
    is_virtual BOOLEAN DEFAULT false,
    virtual_link VARCHAR(500),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_talks_event_id ON talks(event_id);
CREATE INDEX idx_talks_start_time ON talks(event_id, start_time);
CREATE INDEX idx_talks_active ON talks(event_id, active) WHERE active = true;

-- =============================================================================
-- TABLE: talk_registrations
-- User registrations for specific talks
-- =============================================================================
CREATE TABLE talk_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    talk_id UUID NOT NULL REFERENCES talks(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT talk_registrations_user_talk_unique UNIQUE (user_id, talk_id)
);

CREATE INDEX idx_talk_registrations_user ON talk_registrations(user_id);
CREATE INDEX idx_talk_registrations_talk ON talk_registrations(talk_id);

-- =============================================================================
-- TABLE: survey_questions
-- Configurable survey questions per event
-- =============================================================================
CREATE TABLE survey_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    question VARCHAR(500) NOT NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('rating', 'select', 'text', 'boolean')),
    options JSONB DEFAULT '[]'::jsonb,
    required BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_survey_questions_event ON survey_questions(event_id);
CREATE INDEX idx_survey_questions_active ON survey_questions(event_id, active) WHERE active = true;

-- =============================================================================
-- TABLE: survey_answers
-- User survey responses (one per user per event)
-- =============================================================================
CREATE TABLE survey_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    dni VARCHAR(20) NOT NULL,
    answers JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT survey_answers_event_dni_unique UNIQUE (event_id, dni)
);

CREATE INDEX idx_survey_answers_event ON survey_answers(event_id);
CREATE INDEX idx_survey_answers_user ON survey_answers(user_id);

-- =============================================================================
-- TABLE: stands
-- Exhibition stands
-- =============================================================================
CREATE TABLE stands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url TEXT,
    image_url TEXT,
    website VARCHAR(500),
    category VARCHAR(100),
    booth_number VARCHAR(20),
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_stands_event ON stands(event_id);
CREATE INDEX idx_stands_category ON stands(event_id, category);

-- =============================================================================
-- TABLE: sponsors
-- Event sponsors with tier levels
-- =============================================================================
CREATE TABLE sponsors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    website VARCHAR(500),
    tier VARCHAR(20) NOT NULL CHECK (tier IN ('platinum', 'gold', 'silver', 'bronze', 'support')),
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sponsors_event ON sponsors(event_id);
CREATE INDEX idx_sponsors_tier ON sponsors(event_id, tier);

-- =============================================================================
-- TABLE: gallery
-- Event gallery images
-- =============================================================================
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_gallery_event ON gallery(event_id);

-- =============================================================================
-- TABLE: event_content
-- Editable content sections for public pages
-- =============================================================================
CREATE TABLE event_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    section VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    content TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_event_content_event_section ON event_content(event_id, section);

-- =============================================================================
-- TABLE: event_stats
-- Cached statistics per event
-- =============================================================================
CREATE TABLE event_stats (
    event_id UUID PRIMARY KEY REFERENCES events(id) ON DELETE CASCADE,
    total_registered INTEGER DEFAULT 0,
    total_checked_in INTEGER DEFAULT 0,
    total_surveys_completed INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- CONSTRAINTS - Business Rules
-- =============================================================================

-- Only one active event at a time
CREATE OR REPLACE FUNCTION enforce_single_active_event()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.active = true THEN
        UPDATE events SET active = false WHERE id != NEW.id AND active = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_enforce_single_active_event
    BEFORE INSERT OR UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION enforce_single_active_event();

-- Update timestamp on row update
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_talks_updated_at
    BEFORE UPDATE ON talks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_stands_updated_at
    BEFORE UPDATE ON stands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_sponsors_updated_at
    BEFORE UPDATE ON sponsors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_event_content_updated_at
    BEFORE UPDATE ON event_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE how_found ENABLE ROW LEVEL SECURITY;
ALTER TABLE talks ENABLE ROW LEVEL SECURITY;
ALTER TABLE talk_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stands ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_stats ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read public event info)
CREATE POLICY "Public can read active events" ON events FOR SELECT USING (active = true);
CREATE POLICY "Public can read how_found" ON how_found FOR SELECT USING (active = true);
CREATE POLICY "Public can read active talks" ON talks FOR SELECT USING (active = true);
CREATE POLICY "Public can read active stands" ON stands FOR SELECT USING (active = true);
CREATE POLICY "Public can read active sponsors" ON sponsors FOR SELECT USING (active = true);
CREATE POLICY "Public can read active gallery" ON gallery FOR SELECT USING (active = true);
CREATE POLICY "Public can read active content" ON event_content FOR SELECT USING (active = true);
CREATE POLICY "Public can read active questions" ON survey_questions FOR SELECT USING (active = true);

-- Admin policies (full access via service role)
CREATE POLICY "Admins can manage events" ON events FOR ALL USING (true);
CREATE POLICY "Admins can manage users" ON users FOR ALL USING (true);
CREATE POLICY "Admins can manage how_found" ON how_found FOR ALL USING (true);
CREATE POLICY "Admins can manage talks" ON talks FOR ALL USING (true);
CREATE POLICY "Admins can manage talk_registrations" ON talk_registrations FOR ALL USING (true);
CREATE POLICY "Admins can manage survey_questions" ON survey_questions FOR ALL USING (true);
CREATE POLICY "Admins can manage survey_answers" ON survey_answers FOR ALL USING (true);
CREATE POLICY "Admins can manage stands" ON stands FOR ALL USING (true);
CREATE POLICY "Admins can manage sponsors" ON sponsors FOR ALL USING (true);
CREATE POLICY "Admins can manage gallery" ON gallery FOR ALL USING (true);
CREATE POLICY "Admins can manage event_content" ON event_content FOR ALL USING (true);
CREATE POLICY "Admins can manage event_stats" ON event_stats FOR ALL USING (true);

-- =============================================================================
-- STORAGE BUCKETS
-- =============================================================================

INSERT INTO storage.buckets (id, name, public) VALUES 
    ('event-images', 'event-images', true),
    ('sponsor-logos', 'sponsor-logos', true),
    ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- SEED DATA
-- =============================================================================

-- Events
INSERT INTO events (year, title, description, location, date, active) VALUES 
    (2026, 'Expo Formación UOCRA 2026', 'El evento anual de formación profesional para el sector de la construcción', 'Centro de Convenciones Córdoba', '2026-10-15', true),
    (2025, 'Expo Formación UOCRA 2025', 'Evento anual de formación profesional', 'Centro de Convenciones Córdoba', '2025-10-15', false);

-- How Found Options
INSERT INTO how_found (label, sort_order) VALUES 
    ('Redes sociales', 1),
    ('Boca a boca', 2),
    ('Correo electrónico', 3),
    ('Carteleria/Volantes', 4),
    ('Otro', 5);

-- Sample Talks
INSERT INTO talks (event_id, title, description, speaker_name, start_time, end_time, capacity, room, active)
SELECT 
    e.id,
    t.title,
    t.description,
    t.speaker,
    e.date + t.start_time::interval,
    e.date + t.end_time::interval,
    t.capacity,
    t.room,
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Introducción a la Construcción Sustentable', 'Aprende los fundamentos de la construcción verde y sostenible', 'Ing. María González', '09:00', '10:00', 50, 'Sala A'),
        ('Normativas de Seguridad en Altura', 'Protocolos y equipamiento para trabajos en altura', 'Lic. Carlos Rodríguez', '10:30', '11:30', 40, 'Sala B'),
        ('Digitalización en la Construcción', 'Herramientas digitales para gestionar obras', 'Ing. Pedro Sánchez', '12:00', '13:00', 35, 'Sala A'),
        ('Gestión de Residuos de Construcción', 'Cómo reducir el impacto ambiental de las obras', 'Dra. Ana López', '14:00', '15:00', 45, 'Sala C')
) AS t(title, description, speaker, start_time, end_time, capacity, room)
WHERE e.active = true;

-- Sample Stands
INSERT INTO stands (event_id, name, description, category, booth_number, sort_order, active)
SELECT 
    e.id,
    s.name,
    s.description,
    s.category,
    s.booth,
    s.sort_order,
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Ferrimax', 'Materiales de construcción y herramientas', 'Materiales', 'A1', 1),
        ('Cemento Córdoba', 'Cemento y prefabricados de concreto', 'Materiales', 'A2', 2),
        ('Seguridad Laboral SA', 'Equipos de protección personal', 'Seguridad', 'B1', 3),
        ('Techos Argentina', 'Sistemas de cubierta y tejados', 'Techos', 'B2', 4),
        ('Aire Acondicionado Pro', 'Instalaciones HVAC industriales', 'Instalaciones', 'C1', 5),
        ('Pinturas del Centro', 'Pinturas y revestimientos decorativos', 'Acabados', 'C2', 6)
) AS s(name, description, category, booth, sort_order)
WHERE e.active = true;

-- Sample Sponsors
INSERT INTO sponsors (event_id, name, tier, sort_order, active)
SELECT 
    e.id,
    s.name,
    s.tier,
    s.sort_order,
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('Ministerio de Trabajo', 'platinum', 1),
        ('Cámara de la Construcción', 'platinum', 2),
        ('Sistema S', 'gold', 3),
        ('Industrias Metalúrgicas SA', 'gold', 4),
        ('Banco de la Nación', 'silver', 5),
        ('Mutual de Obreros', 'bronze', 6),
        ('Proveedores Asociados', 'support', 7)
) AS s(name, tier, sort_order)
WHERE e.active = true;

-- Sample Survey Questions
INSERT INTO survey_questions (event_id, question, question_type, options, required, sort_order, active)
SELECT 
    e.id,
    q.question,
    q.question_type,
    q.options,
    q.required,
    q.sort_order,
    true
FROM events e
CROSS JOIN (
    VALUES 
        ('¿Cómo evaluarías el evento en general?', 'rating', '[]'::jsonb, true, 1),
        ('¿Qué tan útiles fueron las charlas?', 'rating', '[]'::jsonb, true, 2),
        ('¿Cómo calificarías la organización?', 'rating', '[]'::jsonb, true, 3),
        ('¿El venue fue adecuado?', 'rating', '[]'::jsonb, true, 4),
        ('¿Recomendarías este evento?', 'select', '["Sí, sin duda", "Tal vez", "No"]'::jsonb, true, 5),
        ('¿Tenés algún comentario adicional?', 'text', '[]'::jsonb, false, 6)
) AS q(question, question_type, options, required, sort_order)
WHERE e.active = true;

-- Initialize event stats
INSERT INTO event_stats (event_id, total_registered, total_checked_in, total_surveys_completed)
SELECT id, 0, 0, 0 FROM events WHERE active = true;

-- =============================================================================
-- FUNCTIONS FOR BUSINESS LOGIC
-- =============================================================================

-- Function to get talk capacity status
CREATE OR REPLACE FUNCTION get_talk_capacity(talk_id UUID)
RETURNS TABLE(registered integer, available integer, is_full boolean) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(tr.id)::integer,
        (t.capacity - COUNT(tr.id))::integer,
        (t.capacity <= COUNT(tr.id))::boolean
    FROM talks t
    LEFT JOIN talk_registrations tr ON tr.talk_id = t.id
    WHERE t.id = talk_id
    GROUP BY t.id, t.capacity;
END;
$$ LANGUAGE plpgsql;

-- Function to check talk schedule overlap
CREATE OR REPLACE FUNCTION check_talk_overlap(user_id UUID, new_talk_id UUID)
RETURNS boolean AS $$
DECLARE
    overlap_exists boolean;
    new_start TIMESTAMP;
    new_end TIMESTAMP;
BEGIN
    SELECT start_time, end_time INTO new_start, new_end
    FROM talks WHERE id = new_talk_id;
    
    SELECT EXISTS (
        SELECT 1 FROM talk_registrations tr
        JOIN talks t ON t.id = tr.talk_id
        WHERE tr.user_id = user_id
        AND t.start_time < new_end
        AND t.end_time > new_start
    ) INTO overlap_exists;
    
    RETURN overlap_exists;
END;
$$ LANGUAGE plpgsql;

-- Function to update event stats
CREATE OR REPLACE FUNCTION update_event_stats(event_id UUID)
RETURNS void AS $$
BEGIN
    INSERT INTO event_stats (event_id, total_registered, total_checked_in, total_surveys_completed)
    VALUES (
        event_id,
        (SELECT COUNT(*)::integer FROM users WHERE event_id = event_id),
        (SELECT COUNT(*)::integer FROM users WHERE event_id = event_id AND checked_in = true),
        (SELECT COUNT(*)::integer FROM survey_answers WHERE event_id = event_id)
    )
    ON CONFLICT (event_id) DO UPDATE SET
        total_registered = EXCLUDED.total_registered,
        total_checked_in = EXCLUDED.total_checked_in,
        total_surveys_completed = EXCLUDED.total_surveys_completed,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to register user to talk with validation
CREATE OR REPLACE FUNCTION register_user_to_talk(
    p_user_id UUID,
    p_talk_id UUID,
    p_event_id UUID
) RETURNS JSONB AS $$
DECLARE
    talk_capacity RECORD;
    has_overlap boolean;
    already_registered boolean;
    result JSONB;
BEGIN
    -- Check if already registered
    SELECT EXISTS (
        SELECT 1 FROM talk_registrations 
        WHERE user_id = p_user_id AND talk_id = p_talk_id
    ) INTO already_registered;
    
    IF already_registered THEN
        RETURN '{"success": false, "error": "Ya registrado en esta charla"}'::jsonb;
    END IF;
    
    -- Check capacity
    SELECT registered, available, is_full INTO talk_capacity
    FROM get_talk_capacity(p_talk_id);
    
    IF talk_capacity.is_full THEN
        RETURN '{"success": false, "error": "Charla completa"}'::jsonb;
    END IF;
    
    -- Check schedule overlap
    SELECT check_talk_overlap(p_user_id, p_talk_id) INTO has_overlap;
    
    IF has_overlap THEN
        RETURN '{"success": false, "error": "Conflicto de horario con otra charla"}'::jsonb;
    END IF;
    
    -- Register
    INSERT INTO talk_registrations (user_id, talk_id)
    VALUES (p_user_id, p_talk_id);
    
    -- Update stats
    PERFORM update_event_stats(p_event_id);
    
    RETURN '{"success": true, "message": "Registrado exitosamente"}'::jsonb;
END;
$$ LANGUAGE plpgsql;

-- Function to perform checkin
CREATE OR REPLACE FUNCTION perform_checkin(p_dni TEXT, p_event_id UUID)
RETURNS JSONB AS $$
DECLARE
    user_record RECORD;
    result JSONB;
BEGIN
    SELECT u.id, u.name, u.lastname, u.checked_in INTO user_record
    FROM users u
    WHERE u.dni = p_dni AND u.event_id = p_event_id;
    
    IF user_record.id IS NULL THEN
        RETURN '{"success": false, "error": "Usuario no encontrado"}'::jsonb;
    END IF;
    
    IF user_record.checked_in THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Usuario ya realizado check-in',
            'user', jsonb_build_object('name', user_record.name, 'lastname', user_record.lastname)
        );
    END IF;
    
    UPDATE users 
    SET checked_in = true, checked_in_at = NOW()
    WHERE id = user_record.id;
    
    PERFORM update_event_stats(p_event_id);
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'Check-in realizado',
        'user', jsonb_build_object('name', user_record.name, 'lastname', user_record.lastname)
    );
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- VIEWS
-- =============================================================================

-- View: Active event with stats
CREATE OR REPLACE VIEW v_active_event AS
SELECT 
    e.*,
    es.total_registered,
    es.total_checked_in,
    es.total_surveys_completed
FROM events e
LEFT JOIN event_stats es ON es.event_id = e.id
WHERE e.active = true;

-- View: Talk with registration count
CREATE OR REPLACE VIEW v_talks_with_capacity AS
SELECT 
    t.*,
    COUNT(tr.id) AS registered,
    t.capacity - COUNT(tr.id) AS available,
    t.capacity <= COUNT(tr.id) AS is_full
FROM talks t
LEFT JOIN talk_registrations tr ON tr.talk_id = t.id
WHERE t.active = true
GROUP BY t.id;

-- View: User with talk registrations
CREATE OR REPLACE VIEW v_users_with_talks AS
SELECT 
    u.*,
    array_agg(t.title) FILTER (WHERE t.title IS NOT NULL) AS registered_talks
FROM users u
LEFT JOIN talk_registrations tr ON tr.user_id = u.id
LEFT JOIN talks t ON t.id = tr.talk_id
GROUP BY u.id;

-- =============================================================================
-- END OF SCHEMA
-- =============================================================================