// js/icons.js
class IconsManager {
    constructor() {
        this.icons = this.generateIcons();
        this.filteredIcons = [...this.icons];
        this.visibleCount = 48;
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.init();
    }

    init() {
        this.renderIcons();
        this.initSearch();
        this.initFilters();
        this.initLoadMore();
        this.updateResultsCount();
    }

    generateIcons() {
        const icons = [
            // Development Icons
            {
                name: 'github',
                category: 'development',
                svg: '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>'
            },
            {
                name: 'code',
                category: 'development',
                svg: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>'
            },
            {
                name: 'terminal',
                category: 'development',
                svg: '<rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="M6 8l4 4-4 4m4-4h8"/>'
            },
            {
                name: 'browser',
                category: 'development',
                svg: '<rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="2" y1="8" x2="22" y2="8"/><circle cx="6" cy="6" r="1"/><circle cx="9" cy="6" r="1"/><circle cx="12" cy="6" r="1"/>'
            },
            {
                name: 'server',
                category: 'development',
                svg: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6" y2="6"/><line x1="6" y1="18" x2="6" y2="18"/>'
            },
            {
                name: 'database',
                category: 'development',
                svg: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>'
            },
            {
                name: 'cloud',
                category: 'development',
                svg: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>'
            },
            {
                name: 'git-branch',
                category: 'development',
                svg: '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>'
            },

            // UI Icons
            {
                name: 'user',
                category: 'ui',
                svg: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
            },
            {
                name: 'settings',
                category: 'ui',
                svg: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
            },
            {
                name: 'menu',
                category: 'ui',
                svg: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>'
            },
            {
                name: 'search',
                category: 'ui',
                svg: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'
            },
            {
                name: 'filter',
                category: 'ui',
                svg: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'
            },
            {
                name: 'layout',
                category: 'ui',
                svg: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>'
            },
            {
                name: 'home',
                category: 'ui',
                svg: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'
            },
            {
                name: 'bell',
                category: 'ui',
                svg: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'
            },

            // Business Icons
            {
                name: 'chart',
                category: 'business',
                svg: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'
            },
            {
                name: 'analytics',
                category: 'business',
                svg: '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/><polyline points="2 15.5 12 8.5 22 15.5"/><line x1="12" y1="2" x2="12" y2="8.5"/>'
            },
            {
                name: 'money',
                category: 'business',
                svg: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'
            },
            {
                name: 'shopping-cart',
                category: 'business',
                svg: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'
            },
            {
                name: 'price-tag',
                category: 'business',
                svg: '<path d="M12 1H3v16h9M7 9l5-5 5 5"/>'
            },
            {
                name: 'briefcase',
                category: 'business',
                svg: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
            },
            {
                name: 'trending-up',
                category: 'business',
                svg: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'
            },
            {
                name: 'credit-card',
                category: 'business',
                svg: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>'
            },

            // Social Icons
            {
                name: 'heart',
                category: 'social',
                svg: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'
            },
            {
                name: 'star',
                category: 'social',
                svg: '<polygon points="12 2 15.09 8.26 22 9 16.55 13.47 17.82 20 12 16.77 6.18 20 7.45 13.47 2 9 8.91 8.26 12 2"/>'
            },
            {
                name: 'share',
                category: 'social',
                svg: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>'
            },
            {
                name: 'message',
                category: 'social',
                svg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
            },
            {
                name: 'email',
                category: 'social',
                svg: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'
            },
            {
                name: 'notification',
                category: 'social',
                svg: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'
            },
            {
                name: 'thumbs-up',
                category: 'social',
                svg: '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>'
            },
            {
                name: 'users',
                category: 'social',
                svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
            },

            // Files Icons
            {
                name: 'folder',
                category: 'files',
                svg: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'
            },
            {
                name: 'file',
                category: 'files',
                svg: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>'
            },
            {
                name: 'download',
                category: 'files',
                svg: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'
            },
            {
                name: 'upload',
                category: 'files',
                svg: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>'
            },
            {
                name: 'save',
                category: 'files',
                svg: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>'
            },
            {
                name: 'delete',
                category: 'files',
                svg: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'
            },
            {
                name: 'copy',
                category: 'files',
                svg: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'
            },
            {
                name: 'edit',
                category: 'files',
                svg: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>'
            },

            // Devices Icons
            {
                name: 'mobile',
                category: 'devices',
                svg: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/>'
            },
            {
                name: 'desktop',
                category: 'devices',
                svg: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
            },
            {
                name: 'laptop',
                category: 'devices',
                svg: '<path d="M3 19h18"/><rect x="2" y="4" width="20" height="12" rx="2" ry="2"/>'
            },
            {
                name: 'tablet',
                category: 'devices',
                svg: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/>'
            },
            {
                name: 'phone',
                category: 'devices',
                svg: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
            },
            {
                name: 'camera',
                category: 'devices',
                svg: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>'
            },
            {
                name: 'watch',
                category: 'devices',
                svg: '<circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/>'
            },
            {
                name: 'headphones',
                category: 'devices',
                svg: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>'
            },

            // Media Icons
            {
                name: 'play',
                category: 'media',
                svg: '<polygon points="5 3 19 12 5 21 5 3"/>'
            },
            {
                name: 'pause',
                category: 'media',
                svg: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
            },
            {
                name: 'volume',
                category: 'media',
                svg: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>'
            },
            {
                name: 'image',
                category: 'media',
                svg: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>'
            },
            {
                name: 'video',
                category: 'media',
                svg: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>'
            },
            {
                name: 'music',
                category: 'media',
                svg: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'
            },
            {
                name: 'film',
                category: 'media',
                svg: '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>'
            },
            {
                name: 'mic',
                category: 'media',
                svg: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>'
            },

            // Navigation Icons
            {
                name: 'arrow-up',
                category: 'navigation',
                svg: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>'
            },
            {
                name: 'arrow-down',
                category: 'navigation',
                svg: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>'
            },
            {
                name: 'arrow-left',
                category: 'navigation',
                svg: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'
            },
            {
                name: 'arrow-right',
                category: 'navigation',
                svg: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'
            },
            {
                name: 'chevron-up',
                category: 'navigation',
                svg: '<polyline points="18 15 12 9 6 15"/>'
            },
            {
                name: 'chevron-down',
                category: 'navigation',
                svg: '<polyline points="6 9 12 15 18 9"/>'
            },
            {
                name: 'chevron-left',
                category: 'navigation',
                svg: '<polyline points="15 18 9 12 15 6"/>'
            },
            {
                name: 'chevron-right',
                category: 'navigation',
                svg: '<polyline points="9 18 15 12 9 6"/>'
            },

            // Weather Icons
            {
                name: 'sun',
                category: 'weather',
                svg: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
            },
            {
                name: 'moon',
                category: 'weather',
                svg: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
            },
            {
                name: 'cloud-rain',
                category: 'weather',
                svg: '<line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>'
            },
            {
                name: 'cloud-snow',
                category: 'weather',
                svg: '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="8" y1="20" x2="8" y2="20"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="12" y1="22" x2="12" y2="22"/><line x1="16" y1="16" x2="16" y2="16"/><line x1="16" y1="20" x2="16" y2="20"/>'
            },
            {
                name: 'wind',
                category: 'weather',
                svg: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>'
            },
            {
                name: 'umbrella',
                category: 'weather',
                svg: '<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/>'
            },
            {
                name: 'thermometer',
                category: 'weather',
                svg: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>'
            },
            {
                name: 'compass',
                category: 'weather',
                svg: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'
            }
        ];

        return icons;
    }

    renderIcons() {
        const iconsGrid = document.getElementById('iconsGrid');
        if (!iconsGrid) return;

        const visibleIcons = this.filteredIcons.slice(0, this.visibleCount);
        
        iconsGrid.innerHTML = visibleIcons.map(icon => `
            <div class="icon-card" data-name="${icon.name}" data-category="${icon.category}">
                <svg class="icon-svg" viewBox="0 0 24 24">
                    ${icon.svg}
                </svg>
                <div class="icon-name">${icon.name}</div>
            </div>
        `).join('');

        // Add click handlers for icon cards
        document.querySelectorAll('.icon-card').forEach(card => {
            card.addEventListener('click', () => {
                const iconName = card.dataset.name;
                this.copyIconToClipboard(iconName);
            });
        });
    }

    initSearch() {
        const searchInput = document.getElementById('iconSearch');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.filterIcons();
        });
    }

    initFilters() {
        const filterTags = document.querySelectorAll('.filter-tag');
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Update active state
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');

                this.currentFilter = tag.dataset.filter;
                this.filterIcons();
            });
        });
    }

    initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreIcons');
        if (!loadMoreBtn) return;

        loadMoreBtn.addEventListener('click', () => {
            this.visibleCount += 48;
            this.renderIcons();
            this.updateResultsCount();
            
            // Hide button if all icons are visible
            if (this.visibleCount >= this.filteredIcons.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    filterIcons() {
        this.filteredIcons = this.icons.filter(icon => {
            const matchesSearch = icon.name.toLowerCase().includes(this.currentSearch) ||
                               icon.category.toLowerCase().includes(this.currentSearch);
            const matchesFilter = this.currentFilter === 'all' || icon.category === this.currentFilter;
            
            return matchesSearch && matchesFilter;
        });

        this.visibleCount = 48;
        this.renderIcons();
        this.updateResultsCount();
        
        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreIcons');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = this.filteredIcons.length > this.visibleCount ? 'block' : 'none';
        }
    }

    updateResultsCount() {
        const resultsInfo = document.querySelector('.results-info');
        if (resultsInfo) {
            const visibleCount = Math.min(this.visibleCount, this.filteredIcons.length);
            resultsInfo.textContent = `Showing ${visibleCount} of ${this.filteredIcons.length} icons`;
        }
    }

    copyIconToClipboard(iconName) {
        const icon = this.icons.find(i => i.name === iconName);
        if (!icon) return;

        const svgCode = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${icon.svg}
</svg>`;

        navigator.clipboard.writeText(svgCode).then(() => {
            // Show success message
            this.showNotification(`Icon "${iconName}" copied to clipboard!`);
        }).catch(err => {
            console.error('Failed to copy icon: ', err);
        });
    }

    showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.copy-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary);
            color: var(--text-on-accent);
            padding: 12px 20px;
            border-radius: var(--border-radius-md);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            font-size: 0.9rem;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IconsManager();
});

// Add CSS animations for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
