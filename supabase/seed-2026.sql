-- =============================================================================
-- EXPO FORMACIÓN UOCRA 2026 - DATA SEED SCRIPT
-- Run this in Supabase SQL Editor
-- Based on user's existing schema
-- =============================================================================

-- =============================================================================
-- 1. INSERT EVENTO 2026
-- =============================================================================

INSERT INTO events (year, title, date, active)
VALUES (2026, 'Expo Formación UOCRA', '2026-10-15', true)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 2. INSERT STANDS (EMPRESAS) - usando la estructura real
-- =============================================================================

-- Empresas de Construcción
INSERT INTO stands (event_id, name, description, category, website_url, logo_url)
SELECT e.id, emp.nombre, emp.descripcion, 'construccion', emp.url, emp.logo
FROM events e
CROSS JOIN (
    VALUES 
        ('Dun Dun', 'Mezcla de polímeros para colocación de ladrillos y bloques', 'https://dun-dun.com.ar/', 'https://dundun.com.ar/wp-content/uploads/2016/01/produtividade_1.png'),
        ('El Galgo', 'Empresa líder en fabricación de herramientas profesionales para pintura', 'https://www.elgalgo.com.ar/', 'https://media.licdn.com/dms/image/v2/C4E0BAQEKGI7i2yTcWQ/company-logo_200_200/company-logo_200_200/0/1631354576694?e=2147483647&v=beta&t=LM2Z7KoWPJjaKK-eFRmbXifMKtR6hsxKSXIzqEmm-7U'),
        ('Fischer', 'Empresa multinacional alemana líder en sistemas de fijación', 'https://www.fischer.com.ar', 'https://www.fischer.com.ar/-/media/system/user-defined/og-images/fischer-og-image.png'),
        ('Mekano', 'Diseño y fabricación de estructuras tubulares y andamios', 'https://mekano.com.ar', 'https://mekano.com.ar/images/logo_nav-principal-cabecera.png'),
        ('Retak', 'Ladrillos de Hormarquía Celular Curados en Autoclave (HCCA)', 'https://retak.com.ar/', 'https://retak.com.ar/wp-content/uploads/2024/09/logo_retak_menu.svg'),
        ('Tao', 'Tablero estructural con hojuelas de madera orientadas', 'https://taopaneles.com/', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ0IrDtVEvrfo6kTdSQwFWIzKI4yG5FdYxWg&s'),
        ('Sinteplast', 'Empresa líder de capitales nacionales en pinturas', 'https://www.sinteplast.com.ar/', 'https://http2.mlstatic.com/D_NQ_NP_996466-MLA70931999155_082023-O.webp'),
        ('Durlock', 'Líder en sistemas de construcción en seco', 'https://durlock.com/', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2F5n_mS1D5foPebBFeD2y6goItHGHOmXlgQ&s'),
        ('Saint Gobain', 'Empresa multinacional fabricante de materiales', 'https://www.saint-gobain.ar/es', 'https://www.hipco.com/wp-content/uploads/2020/07/Logo-Saint-Gobain.png'),
        ('Plavicon', 'Impermeabilizantes y materiales para construcción', 'https://www.plavicon.com/site/index.php', 'https://www.plavicon.com/site/imagenes/logo.png'),
        ('Ceramica San Lorenzo', 'Fabricación de cerámicas de calidad', 'https://ceramicasanlorenzo.com.ar/', 'https://ceramicasanlorenzo.com.ar/wp-content/themes/csl/images/logo.svg'),
        ('Loma Negra', 'Empresa líder en producción de cemento', 'https://www.lomanegra.com/', 'https://www.lomanegra.com/wp-content/uploads/2022/08/logo-loma-negra.png'),
        ('Acerbrag', 'Fabricación de productos de acero de alta calidad', 'https://www.acerbrag.com/', 'https://www.acerbrag.com/imgs/logo-acerbrag.svg'),
        ('Later-Cer', 'Grupo líder en fabricación de ladrillo cerámico', 'https://later-cersa.com.ar/', 'https://later-cersa.com.ar/wp-content/uploads/2022/07/Logo_Encabezado.png'),
        ('Aluar', 'Compañía de capitales nacionales en la industria del aluminio', 'https://www.aluar.com.ar/', 'https://www.aluar.com.ar/assets/sitio/img/aluar-logo.svg'),
        ('Klaukol', 'Líder en adhesivos y pastinas para pisos cerámicos', 'https://arg.sika.com/klaukol', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YiEH3V2n1UhpxqT6kuC2Tc76kppJIUme9g&s'),
        ('Alba', 'Marca líder de pinturas decorativas', 'https://www.alba.com.ar/es', 'https://images.akzonobel.com/akzonobel-flourish/alba/ar/es/homepage/logo-alba-100.png?impolicy=.auto'),
        ('Bremen', 'Herramientas para profesionales de la construcción', 'https://www.brementools.com/', 'https://bremenar.vtexassets.com/assets/vtex.file-manager-graphql/images/929679d8-6818-4504-a16d-d76ebbfe2bc8___df3a039fc3515b5732deac0cd682ba06.svg'),
        ('PPA Bs As', 'Soluciones en automatismos de portones y seguridad', 'https://www.ppabsas.com.ar/', 'https://www.ppabsas.com.ar/img/logo-ppa.png')
) AS emp(nombre, descripcion, url, logo)
WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- Empresas Sanitarias
INSERT INTO stands (event_id, name, description, category, website_url, logo_url)
SELECT e.id, emp.nombre, emp.descripcion, 'sanitarias', emp.url, emp.logo
FROM events e
CROSS JOIN (
    VALUES 
        ('Escorial', 'Empresa familiar dedicada a artefactos de cocción', 'https://www.escorial.com.ar/', 'https://escorial.com.ar/unregalo/img/logo-escorial.png'),
        ('Latyn', 'Distribución de griferías y equipamiento', 'https://www.latyn.net/', 'https://www.latyn.net/img/logo_header.svg'),
        ('Ferrum S.A.', 'Soluciones para baño, cocina y lavadero', 'https://ferrum.com/', 'https://ferrum.com/pub/media/athlete2/default/logo_fv.png'),
        ('Grupo DEMA', 'Empresa dinámica en el sector sanitario', 'https://www.grupodema.com.ar/', 'https://www.grupodema.com.ar/bundles/app/front/resources/img/dema-logoSombra.jpg'),
        ('Dinatecnica', 'Más de 55 años en soluciones de tuberías', 'https://dinatecnica.com.ar/', 'https://http2.mlstatic.com/D_NQ_NP_758107-MLA43580721883_092020-O.webp'),
        ('FV', 'Confort en baños y cocinas', 'https://fvsa.com/', 'https://ferrum.com/pub/media/athlete2/default/logo_fv.png')
) AS emp(nombre, descripcion, url, logo)
WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- Empresas Electricidad
INSERT INTO stands (event_id, name, description, category, website_url, logo_url)
SELECT e.id, emp.nombre, emp.descripcion, 'electricidad', emp.url, emp.logo
FROM events e
CROSS JOIN (
    VALUES 
        ('Conextube', 'Productos para instalaciones eléctricas seguras', 'https://www.conextube.com/', 'https://www.conextube.com/assets/imgs/logo-conextube-light-ss.svg'),
        ('Schneider Electric', 'Sostenibilidad y Eficiencia energética', 'https://www.se.com/', 'https://www.logo.wine/a/logo/Schneider_Electric/Schneider_Electric-Logo.wine.svg'),
        ('Gralf', 'Instrumentos de medición y control eléctrico', 'https://www.gralf.com.ar', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOqscXAy-E8-bqnun_6EhVQ7ydWj7_xj2SzA&s'),
        ('Micro Control', 'Canalización y conectividad eléctrica', 'https://microcontrol.com.ar/', 'https://microcontrol.com.ar/storage/2023/11/isologo-microcontrol-180x80-1.png'),
        ('Zoloda', 'Soluciones en canalización eléctrica', 'https://www.zoloda.com.ar/', 'https://www.zoloda.com.ar/wp-content/uploads/ICONO-1.png'),
        ('Genrod', 'Tecnología y calidad en sector eléctrico', 'https://fundacion.uocra.org/', 'https://electricaoscar.com/images/default/productos/genrod52.jpg'),
        ('Cambre', 'Fabricante de material eléctrico', 'https://cambre.com.ar/', 'https://migluz.ar/wp-content/uploads/2023/01/logo-cambre.jpg')
) AS emp(nombre, descripcion, url, logo)
WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- Instituciones
INSERT INTO stands (event_id, name, description, category, website_url, logo_url)
SELECT e.id, emp.nombre, emp.descripcion, 'instituciones', emp.url, emp.logo
FROM events e
CROSS JOIN (
    VALUES 
        ('Fundación UOCRA', 'ONG de formación profesional para trabajadores', 'https://fundacion.uocra.org/', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQriRNbgrf454MsqjE0gXKp86GTp8_vLhLacg&s'),
        ('UOCRA Mujeres', 'Asistencia a trabajadoras constructoras', 'https://mujeres.uocra.org/', 'https://mujeres.uocra.org/wp-content/uploads/2022/11/stickers_5.png'),
        ('MOECRA', 'Mutual para trabajadores constructores', 'https://mutual.uocra.org/', 'https://mutual.uocra.org/wp-content/uploads/2023/09/cropped-LogoMOECRA.png'),
        ('Construir TV', 'Canal temático sobre el mundo del trabajo', 'https://www.construirtv.com/', 'https://www.construirtv.com/wp-content/uploads/2017/09/logo-ctv.jpg'),
        ('Consejo de Bomberos', 'Protección Civil en Argentina', 'https://www.bomberosra.org.ar', 'https://www.bomberosra.org.ar/wp-content/uploads/2023/06/logo-CNB.jpg.png'),
        ('INET', 'Instituto Nacional de Educación Tecnológica', 'https://www.inet.edu.ar/', 'https://rfietp.educacion.gob.ar/imagenes/logo-inet.png'),
        ('CAMARCO', 'Cámara Argentina de la Construcción', 'https://www.camarco.org.ar/', 'https://www.camarco.org.ar/wp-content/uploads/2022/06/camarco.png')
) AS emp(nombre, descripcion, url, logo)
WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 3. INSERT CHARLAS (TALKS)
-- =============================================================================

INSERT INTO talks (event_id, title, description, start_time, end_time, capacity, room)
SELECT 
    e.id,
    'Introducción a la Construcción Sustentable',
    'Aprende los fundamentos de la construcción verde y sostenible.',
    e.date + INTERVAL '9 hours',
    e.date + INTERVAL '10 hours',
    50,
    'Sala A'
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (event_id, title, description, start_time, end_time, capacity, room)
SELECT 
    e.id,
    'Normativas de Seguridad en Altura',
    'Protocolos y equipamiento para trabajos en altura.',
    e.date + INTERVAL '10 hours 30 minutes',
    e.date + INTERVAL '11 hours 30 minutes',
    40,
    'Sala B'
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (event_id, title, description, start_time, end_time, capacity, room)
SELECT 
    e.id,
    'Digitalización en la Construcción',
    'Herramientas digitales para gestionar obras.',
    e.date + INTERVAL '12 hours',
    e.date + INTERVAL '13 hours',
    35,
    'Sala A'
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (event_id, title, description, start_time, end_time, capacity, room)
SELECT 
    e.id,
    'Gestión de Residuos de Construcción',
    'Cómo reducir el impacto ambiental de las obras.',
    e.date + INTERVAL '14 hours',
    e.date + INTERVAL '15 hours',
    45,
    'Sala C'
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (event_id, title, description, start_time, end_time, capacity, room)
SELECT 
    e.id,
    'Nuevas Tecnologías en Materiales',
    'Innovaciones en materiales de construcción.',
    e.date + INTERVAL '15 hours 30 minutes',
    e.date + INTERVAL '16 hours 30 minutes',
    40,
    'Sala B'
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO talks (event_id, title, description, start_time, end_time, capacity, room)
SELECT 
    e.id,
    'Formación Profesional y Mercado Laboral',
    'El rol de la formación profesional en el sector construcción.',
    e.date + INTERVAL '17 hours',
    e.date + INTERVAL '18 hours',
    60,
    'Auditorio Principal'
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- =============================================================================
-- 4. INSERT COMPETITIONS
-- =============================================================================

INSERT INTO competitions (event_id, name, description, schedule, location)
SELECT 
    e.id,
    'Montador Electricista Domiciliario',
    'Competición de armado de tableros eléctricos según normativa vigente.',
    e.date + INTERVAL '13 hours',
    'Centro Evaluador de Competencias IERIC'
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

INSERT INTO competitions (event_id, name, description, schedule, location)
SELECT 
    e.id,
    'Montador Sanitarista',
    'Desafíos reales de instalación sanitaria siguiendo normas de calidad y seguridad.',
    e.date + INTERVAL '16 hours',
    'Centro Evaluador de Competencias IERIC'
FROM events e WHERE e.year = 2026
ON CONFLICT DO NOTHING;

-- =============================================================================
-- VERIFICACIÓN
-- =============================================================================

SELECT 'Eventos' as tabla, COUNT(*) as total FROM events WHERE year = 2026
UNION ALL
SELECT 'Stands', COUNT(*) FROM stands WHERE event_id = (SELECT id FROM events WHERE year = 2026)
UNION ALL
SELECT 'Charlas', COUNT(*) FROM talks WHERE event_id = (SELECT id FROM events WHERE year = 2026)
UNION ALL
SELECT 'Competencias', COUNT(*) FROM competitions WHERE event_id = (SELECT id FROM events WHERE year = 2026);

-- =============================================================================
-- FIN DEL SCRIPT
-- =============================================================================