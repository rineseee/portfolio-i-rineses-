/* ========================================
   LANGUAGE SWITCHER (EN / SQ / DE)
   ======================================== */
(function initI18n() {
    const STORAGE_KEY = 'portfolio-lang';

    const translations = {
        skip_nav: {
            en: 'Skip to main content',
            sq: 'Kalo te përmbajtja kryesore',
            de: 'Zum Hauptinhalt springen'
        },
        nav_about: { en: 'About', sq: 'Rreth Meje', de: 'Über mich' },
        nav_projects: { en: 'Projects', sq: 'Projektet', de: 'Projekte' },
        nav_services: { en: 'Services', sq: 'Shërbimet', de: 'Leistungen' },
        nav_skills: { en: 'Skills', sq: 'Aftësitë', de: 'Fähigkeiten' },
        nav_contact: { en: 'Contact', sq: 'Kontakti', de: 'Kontakt' },

        hero_title: {
            en: 'Bringing your vision to <span class="highlight">life online</span>',
            sq: 'Duke sjellë vizionin tënd <span class="highlight">në jetë online</span>',
            de: 'Ich bringe deine Vision <span class="highlight">online zum Leben</span>'
        },
        hero_desc: {
            en: "I'm <strong>Rinesa Krasniqi</strong>, a passionate <strong>Full Stack Developer</strong> building high-performance web apps with <strong>Laravel</strong> and <strong>Vue.js</strong>, combining clean design and modern tech for seamless user experiences.",
            sq: 'Unë jam <strong>Rinesa Krasniqi</strong>, një <strong>Full Stack Developer</strong> e apasionuar që ndërton aplikacione web me performancë të lartë me <strong>Laravel</strong> dhe <strong>Vue.js</strong>, duke kombinuar dizajn të pastër dhe teknologji moderne për përvoja të papërsëritshme për përdoruesit.',
            de: 'Ich bin <strong>Rinesa Krasniqi</strong>, eine leidenschaftliche <strong>Full-Stack-Entwicklerin</strong>, die leistungsstarke Webanwendungen mit <strong>Laravel</strong> und <strong>Vue.js</strong> entwickelt und dabei klares Design mit moderner Technologie für nahtlose Nutzererlebnisse verbindet.'
        },
        btn_download_cv: { en: 'Download CV', sq: 'Shkarko CV', de: 'Lebenslauf herunterladen' },
        btn_get_in_touch: { en: 'Get in Touch', sq: 'Na Kontakto', de: 'Kontakt aufnehmen' },

        about_label: { en: 'About Me', sq: 'Rreth Meje', de: 'Über mich' },
        about_heading: {
            en: 'Motivated developer,<br>passionate about <span class="highlight">AI</span>.',
            sq: 'Zhvilluese e motivuar,<br>e apasionuar pas <span class="highlight">AI</span>.',
            de: 'Motivierte Entwicklerin,<br>begeistert von <span class="highlight">KI</span>.'
        },
        about_bio: {
            en: "I'm a <strong>Full Stack Developer</strong> with hands-on experience building dynamic, user-friendly web applications. I combine a strong technical foundation with an eye for clean design — writing code that's readable, secure, and maintainable.",
            sq: 'Jam <strong>Full Stack Developer</strong> me përvojë praktike në ndërtimin e aplikacioneve web dinamike dhe miqësore për përdoruesit. Kombinoj një bazë të fortë teknike me kujdes për dizajn të pastër — duke shkruar kod të lexueshëm, të sigurt dhe të mirëmbajtshëm.',
            de: 'Ich bin eine <strong>Full-Stack-Entwicklerin</strong> mit praktischer Erfahrung in der Entwicklung dynamischer, benutzerfreundlicher Webanwendungen. Ich verbinde eine solide technische Grundlage mit einem Blick für klares Design — und schreibe Code, der lesbar, sicher und wartbar ist.'
        },
        about_tagline: {
            en: 'Building digital experiences with purpose.',
            sq: 'Duke krijuar përvoja digjitale me qëllim.',
            de: 'Ich gestalte digitale Erlebnisse mit Sinn und Zweck.'
        },
        stat_cs: { en: 'Computer Science, 2022–2026', sq: 'Shkenca Kompjuterike, 2022–2026', de: 'Informatik, 2022–2026' },
        stat_years: { en: 'Years of Experience', sq: 'Vite Përvojë', de: 'Jahre Erfahrung' },
        stat_certs: { en: 'Professional Certificates', sq: 'Certifikata Profesionale', de: 'Berufliche Zertifikate' },
        stat_location: { en: 'Prizren, Kosovo', sq: 'Prizren, Kosovë', de: 'Prizren, Kosovo' },

        projects_heading: { en: 'Projects', sq: 'Projektet', de: 'Projekte' },
        btn_view_project: { en: 'View Project', sq: 'Shiko Projektin', de: 'Projekt ansehen' },

        services_heading: { en: 'Services Offered', sq: 'Shërbimet e Ofruara', de: 'Angebotene Leistungen' },
        service1_title: { en: 'Full Stack Web Development', sq: 'Zhvillim Full Stack Web', de: 'Full-Stack-Webentwicklung' },
        service1_desc: {
            en: 'End-to-end web applications from database design to polished UI using Laravel, Vue.js, PHP, and MySQL.',
            sq: 'Aplikacione web nga fillimi në fund, nga dizajni i bazës së të dhënave deri te UI i përpunuar, duke përdorur Laravel, Vue.js, PHP dhe MySQL.',
            de: 'End-to-End-Webanwendungen vom Datenbankdesign bis zur ausgefeilten Benutzeroberfläche mit Laravel, Vue.js, PHP und MySQL.'
        },
        service2_title: { en: 'Frontend Development', sq: 'Zhvillim Frontend', de: 'Frontend-Entwicklung' },
        service2_desc: {
            en: 'Responsive, accessible, and performant interfaces built with modern HTML, CSS, JavaScript, and Vue.js.',
            sq: 'Ndërfaqe responsive, të aksesueshme dhe performante, të ndërtuara me HTML, CSS, JavaScript dhe Vue.js modern.',
            de: 'Responsive, barrierefreie und leistungsstarke Oberflächen mit modernem HTML, CSS, JavaScript und Vue.js.'
        },
        service3_title: { en: 'Backend &amp; API Development', sq: 'Zhvillim Backend &amp; API', de: 'Backend- &amp; API-Entwicklung' },
        service3_desc: {
            en: 'Robust backend systems and RESTful APIs with authentication, data management, and clean architecture.',
            sq: 'Sisteme backend të qëndrueshme dhe RESTful API me autentikim, menaxhim të dhënash dhe arkitekturë të pastër.',
            de: 'Robuste Backend-Systeme und RESTful-APIs mit Authentifizierung, Datenverwaltung und sauberer Architektur.'
        },
        service4_title: { en: 'Data Privacy &amp; Security', sq: 'Privatësia &amp; Siguria e të Dhënave', de: 'Datenschutz &amp; Sicherheit' },
        service4_desc: {
            en: 'Implementing secure web practices, data protection measures, and GDPR-aligned solutions — certified by Cacttus.',
            sq: 'Zbatim i praktikave të sigurta web, masave për mbrojtjen e të dhënave dhe zgjidhjeve në përputhje me GDPR — e certifikuar nga Cacttus.',
            de: 'Umsetzung sicherer Web-Praktiken, Datenschutzmaßnahmen und DSGVO-konformer Lösungen — zertifiziert von Cacttus.'
        },

        skills_label: { en: 'What I work with', sq: 'Me çfarë punoj', de: 'Womit ich arbeite' },
        skills_heading: { en: 'Skills &amp; Expertise', sq: 'Aftësi &amp; Ekspertizë', de: 'Fähigkeiten &amp; Expertise' },
        skill_group_frontend: { en: 'Frontend', sq: 'Frontend', de: 'Frontend' },
        skill_group_backend: { en: 'Backend', sq: 'Backend', de: 'Backend' },
        skill_group_tools: { en: 'Tools &amp; Other', sq: 'Mjete &amp; Të Tjera', de: 'Tools &amp; Sonstiges' },

        contact_label: { en: 'Contact', sq: 'Kontakti', de: 'Kontakt' },
        contact_heading: {
            en: 'Let\'s work <span class="highlight">together</span>',
            sq: 'Le të punojmë <span class="highlight">së bashku</span>',
            de: 'Lass uns <span class="highlight">zusammenarbeiten</span>'
        },
        contact_desc: {
            en: "I'm open to new opportunities, collaborations, and interesting projects. Drop me a message and I'll get back to you as soon as possible.",
            sq: 'Jam e hapur për mundësi të reja, bashkëpunime dhe projekte interesante. Më dërgo një mesazh dhe do të të kthej përgjigje sa më shpejt të jetë e mundur.',
            de: 'Ich bin offen für neue Möglichkeiten, Kooperationen und interessante Projekte. Schreib mir eine Nachricht und ich melde mich so schnell wie möglich zurück.'
        },
        form_name: { en: 'Your Name', sq: 'Emri Yt', de: 'Dein Name' },
        form_subject: { en: 'Subject', sq: 'Subjekti', de: 'Betreff' },
        form_message: { en: 'Message', sq: 'Mesazhi', de: 'Nachricht' },
        btn_send_message: { en: 'Send Message', sq: 'Dërgo Mesazhin', de: 'Nachricht senden' },
        status_available: {
            en: 'Available now — usually replies within 24h',
            sq: 'Aktualisht e disponueshme — zakonisht përgjigjet brenda 24 orëve',
            de: 'Derzeit verfügbar — antwortet meist innerhalb von 24 Std.'
        },

        footer_home: { en: 'Home', sq: 'Ballina', de: 'Startseite' },
        footer_copyright: {
            en: '&copy; 2026 Rinesa Krasniqi. All rights reserved.',
            sq: '&copy; 2026 Rinesa Krasniqi. Të gjitha të drejtat e rezervuara.',
            de: '&copy; 2026 Rinesa Krasniqi. Alle Rechte vorbehalten.'
        }
    };

    const langSelect = document.getElementById('lang-select');

    function applyLanguage(lang) {
        if (!translations.hero_title[lang]) lang = 'en';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const entry = translations[key];
            if (entry && entry[lang]) el.textContent = entry[lang];
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const entry = translations[key];
            if (entry && entry[lang]) el.innerHTML = entry[lang];
        });

        document.documentElement.setAttribute('lang', lang);
        if (langSelect) langSelect.value = lang;
        localStorage.setItem(STORAGE_KEY, lang);
    }

    const saved = localStorage.getItem(STORAGE_KEY) || 'en';
    applyLanguage(saved);

    if (langSelect) {
        langSelect.addEventListener('change', () => {
            applyLanguage(langSelect.value);
        });
    }
})();
