// Admin Panel JavaScript
const API_BASE = 'http://localhost:5000/api';
let authToken = localStorage.getItem('rdb_admin_token');

// ===================== AUTH =====================

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (data.success) {
            authToken = data.data.token;
            localStorage.setItem('rdb_admin_token', authToken);
            localStorage.setItem('rdb_admin_user', JSON.stringify(data.data.user));
            showDashboard(data.data.user);
        } else {
            errorEl.textContent = data.message || 'Login failed';
            errorEl.style.display = 'block';
        }
    } catch (err) {
        errorEl.textContent = 'Cannot connect to server. Make sure backend is running.';
        errorEl.style.display = 'block';
    }
});

function showDashboard(user) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
    document.getElementById('adminUsername').textContent = user.username || 'Admin';
    loadDashboard();
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('rdb_admin_token');
    localStorage.removeItem('rdb_admin_user');
    authToken = null;
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('loginForm').reset();
});

// Check existing session
if (authToken) {
    const user = JSON.parse(localStorage.getItem('rdb_admin_user') || '{}');
    showDashboard(user);
}

// ===================== NAVIGATION =====================

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;

        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById(`${section}Section`).classList.add('active');
        document.getElementById('pageTitle').textContent = item.textContent.trim();

        // Load data for each section
        switch (section) {
            case 'dashboard': loadDashboard(); break;
            case 'personnel': loadPersonnel(); break;
            case 'contacts': loadContacts(); break;
            case 'careers': loadCareers(); break;
            case 'alerts': loadAlerts(); break;
            case 'branches': loadBranches(); break;
            case 'loans': loadLoans(); break;
            case 'savings': loadSavings(); break;
            case 'news': loadNews(); break;
            case 'complaints': loadComplaints(); break;
            case 'awards': loadAwards(); break;
        }
    });
});

// ===================== API HELPERS =====================

// Fallback demo data when database is unavailable
const DEMO_DATA = {
    personnel: [
        { _id: 'demo1', name: 'Mr. Ranjith Kodituwakku', position: 'Chairman', category: 'chairman', order: 1 },
        { _id: 'demo2', name: 'Mr. Asanga Tennakoon', position: 'General Manager / CEO', category: 'general_manager', order: 1 },
        { _id: 'demo3', name: 'Mr. Asoka Bandara', position: 'Director', category: 'board_of_directors', order: 1 }
    ],
    contacts: [
        { _id: 'demo1', name: 'John Silva', category: 'inquiry', email: 'john@example.com', contact: '0771234567', status: 'new', message: 'Inquiry about loans', createdAt: new Date().toISOString() },
        { _id: 'demo2', name: 'Mary Fernando', category: 'complaint', email: 'mary@example.com', contact: '0779876543', status: 'in_progress', message: 'Branch service issue', createdAt: new Date().toISOString() }
    ],
    careers: [
        { _id: 'demo1', title: 'Senior Banking Officer', department: 'Retail Banking', location: 'Colombo', type: 'full-time', closingDate: '2026-03-15', isActive: true },
        { _id: 'demo2', title: 'IT Support Engineer', department: 'Information Technology', location: 'Colombo', type: 'full-time', closingDate: '2026-03-20', isActive: true }
    ],
    alerts: [
        { _id: 'demo1', title: 'System Maintenance Notice', content: 'Online banking will be unavailable on Sunday 2-4 AM', type: 'maintenance', isActive: true, expiryDate: '2026-03-01' },
        { _id: 'demo2', title: 'New Interest Rates', content: 'Updated savings interest rates effective March 1st', type: 'info', isActive: true }
    ],
    branches: [
        { _id: 'demo1', name: 'Head Office', province: 'Western', district: 'Colombo', address: 'No. 16, Sir Chittampalam A. Gardiner Mawatha, Colombo 02', phone: '(+94) 11 2 350000', email: 'info@rdb.lk' },
        { _id: 'demo2', name: 'Kandy Branch', province: 'Central', district: 'Kandy', address: 'No. 45, Dalada Veediya, Kandy', phone: '(+94) 81 2 234567', email: 'kandy@rdb.lk' },
        { _id: 'demo3', name: 'Galle Branch', province: 'Southern', district: 'Galle', address: 'No. 12, Main Street, Galle', phone: '(+94) 91 2 234567', email: 'galle@rdb.lk' }
    ],
    loans: [
        { _id: 'demo1', name: 'Kekulu Savings Loan', category: 'personal', interestRate: 12.5, maxAmount: 500000, maxTerm: 60 },
        { _id: 'demo2', name: 'Govi Navoda (Agricultural)', category: 'agriculture', interestRate: 8.0, maxAmount: 1000000, maxTerm: 120 },
        { _id: 'demo3', name: 'Speed Cash', category: 'personal', interestRate: 14.0, maxAmount: 300000, maxTerm: 36 }
    ],
    savings: [
        { _id: 'demo1', name: 'Kekulu Children Savings', category: 'children', interestRate: 8.5, minDeposit: 100, tenure: 'No limit', isActive: true },
        { _id: 'demo2', name: 'Senior Citizens FD', category: 'senior', interestRate: 12.0, minDeposit: 10000, tenure: '1 year', isActive: true },
        { _id: 'demo3', name: 'Regular Savings', category: 'savings', interestRate: 6.5, minDeposit: 500, tenure: 'No limit', isActive: true }
    ],
    news: [],
    complaints: [
        { _id: 'demo1', title: 'Branch Service Issue', category: 'service', priority: 'high', status: 'acknowledged', customerName: 'John Silva', email: 'john@example.com', phone: '0771234567', accountNumber: 'RDB123456', branchName: 'Colombo', description: 'Long waiting time at branch counter', adminNotes: 'Acknowledged - under review', satisfaction: 'not_rated', compensationOffered: '', incidentDate: '2026-02-15', createdAt: new Date().toISOString() },
        { _id: 'demo2', title: 'ATM Cash Withdrawal Issue', category: 'facility', priority: 'medium', status: 'in_progress', customerName: 'Mary Fernando', email: 'mary@example.com', phone: '0779876543', accountNumber: 'RDB789012', branchName: 'Kandy', description: 'ATM not dispensing cash properly', adminNotes: 'Contacted technical team for ATM maintenance', satisfaction: 'not_rated', compensationOffered: '', incidentDate: '2026-02-14', createdAt: new Date().toISOString() },
        { _id: 'demo3', title: 'Interest Rate Billing Error', category: 'billing', priority: 'critical', status: 'resolved', customerName: 'Peter Johnson', email: 'peter@example.com', phone: '0712345678', accountNumber: 'RDB345678', branchName: 'Galle', description: 'Incorrect interest calculation on savings account', adminNotes: 'Issue identified and account credited with additional interest', satisfaction: 'satisfied', compensationOffered: 'Interest adjustment applied', incidentDate: '2026-02-10', createdAt: new Date().toISOString() }
    ]
};

async function apiGet(endpoint) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${API_BASE}${endpoint}`, {
            headers: { 'Authorization': `Bearer ${authToken}` },
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        const data = await res.json();
        if (data.success === false && !data.data) {
            return getFallbackData(endpoint);
        }
        return data;
    } catch (err) {
        console.warn('API unavailable, using demo data for:', endpoint);
        return getFallbackData(endpoint);
    }
}

function getFallbackData(endpoint) {
    // Show demo mode banner
    const banner = document.getElementById('demoBanner');
    if (banner) banner.style.display = 'block';
    
    if (endpoint.includes('/personnel')) return { success: true, count: DEMO_DATA.personnel.length, data: DEMO_DATA.personnel };
    if (endpoint.includes('/contacts')) return { success: true, count: DEMO_DATA.contacts.length, data: DEMO_DATA.contacts };
    if (endpoint.includes('/careers')) return { success: true, count: DEMO_DATA.careers.length, data: DEMO_DATA.careers };
    if (endpoint.includes('/alerts')) return { success: true, count: DEMO_DATA.alerts.length, data: DEMO_DATA.alerts };
    if (endpoint.includes('/branches')) return { success: true, count: DEMO_DATA.branches.length, data: DEMO_DATA.branches };
    if (endpoint.includes('/loan-products')) return { success: true, count: DEMO_DATA.loans.length, data: DEMO_DATA.loans };
    if (endpoint.includes('/savings-products')) return { success: true, count: DEMO_DATA.savings.length, data: DEMO_DATA.savings };
    if (endpoint.includes('/news')) return { success: true, count: DEMO_DATA.news.length, data: DEMO_DATA.news };
    if (endpoint.includes('/complaints')) return { success: true, count: DEMO_DATA.complaints.length, data: DEMO_DATA.complaints };
    return { success: true, count: 0, data: [] };
}

async function apiPost(endpoint, body) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify(body)
    });
    return res.json();
}

async function apiPut(endpoint, body) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify(body)
    });
    return res.json();
}

async function apiDelete(endpoint) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
    });
    return res.json();
}

// ===================== DASHBOARD =====================

async function loadDashboard() {
    try {
        const [personnel, contacts, careers, alerts, branches, loans, savings, news, complaints, awards] = await Promise.all([
            apiGet('/personnel'),
            apiGet('/contacts'),
            apiGet('/careers/all'),
            apiGet('/alerts/all'),
            apiGet('/branches'),
            apiGet('/loan-products'),
            apiGet('/savings-products'),
            apiGet('/news/all'),
            apiGet('/complaints'),
            apiGet('/awards/all')
        ]);

        document.getElementById('personnelCount').textContent = personnel.count || 0;
        document.getElementById('contactCount').textContent = contacts.count || 0;
        document.getElementById('careerCount').textContent = careers.count || 0;
        document.getElementById('alertCount').textContent = alerts.count || 0;
        document.getElementById('branchCount').textContent = branches.count || 0;
        document.getElementById('loanCount').textContent = loans.count || 0;
        document.getElementById('savingsCount').textContent = savings.count || 0;
        document.getElementById('newsCount').textContent = news.count || 0;
        document.getElementById('complaintCount').textContent = complaints.count || 0;
        document.getElementById('awardCount').textContent = awards.count || 0;

        // Recent contacts
        const recentDiv = document.getElementById('recentContacts');
        if (contacts.data && contacts.data.length > 0) {
            const recent = contacts.data.slice(0, 5);
            recentDiv.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>Name</th><th>Category</th><th>Email</th><th>Status</th><th>Date</th></tr></thead>
                    <tbody>
                        ${recent.map(c => `
                            <tr>
                                <td>${c.name}</td>
                                <td>${c.category}</td>
                                <td>${c.email}</td>
                                <td><span class="status-badge status-${c.status}">${c.status}</span></td>
                                <td>${new Date(c.createdAt).toLocaleDateString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            recentDiv.innerHTML = '<p class="empty-state">No contact messages yet.</p>';
        }
    } catch (err) {
        console.error('Dashboard load error:', err);
    }
}

// ===================== PERSONNEL =====================

async function loadPersonnel() {
    const filter = document.getElementById('personnelFilter').value;
    const queryParam = filter ? `?category=${filter}` : '';
    try {
        const data = await apiGet(`/personnel/all${queryParam}`);
        const container = document.getElementById('personnelList');
        if (data.data && data.data.length > 0) {
            container.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>Name</th><th>Position</th><th>Category</th><th>Order</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${data.data.map(p => `
                            <tr>
                                <td>${p.name}</td>
                                <td>${p.position}</td>
                                <td>${p.category.replace(/_/g, ' ')}</td>
                                <td>${p.order}</td>
                                <td class="actions">
                                    <button class="edit-btn" onclick="editPersonnel('${p._id}')">Edit</button>
                                    <button class="delete-btn" onclick="deletePersonnel('${p._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = '<p class="empty-state">No personnel found.</p>';
        }
    } catch (err) { console.error(err); }
}

function showPersonnelForm(data = null) {
    document.getElementById('personnelFormTitle').textContent = data ? 'Edit Personnel' : 'Add Personnel';
    document.getElementById('personnelId').value = data ? data._id : '';
    document.getElementById('pName').value = data ? data.name : '';
    document.getElementById('pPosition').value = data ? data.position : '';
    document.getElementById('pCategory').value = data ? data.category : 'board_of_directors';
    document.getElementById('pOrder').value = data ? data.order : 1;
    document.getElementById('pDescription').value = data ? data.description || '' : '';
    document.getElementById('pPhoto').value = data ? data.photo || '' : '';
    document.getElementById('pEmail').value = data ? data.email || '' : '';
    document.getElementById('pPhone').value = data ? data.phone || '' : '';
    document.getElementById('pOffice').value = data ? data.office || '' : '';
    document.getElementById('personnelModal').style.display = 'flex';
}

async function editPersonnel(id) {
    const data = await apiGet(`/personnel/${id}`);
    if (data.success) showPersonnelForm(data.data);
}

async function savePersonnel(e) {
    e.preventDefault();
    const id = document.getElementById('personnelId').value;
    const body = {
        name: document.getElementById('pName').value,
        position: document.getElementById('pPosition').value,
        category: document.getElementById('pCategory').value,
        order: parseInt(document.getElementById('pOrder').value),
        description: document.getElementById('pDescription').value,
        photo: document.getElementById('pPhoto').value,
        email: document.getElementById('pEmail').value,
        phone: document.getElementById('pPhone').value,
        office: document.getElementById('pOffice').value
    };

    const result = id ? await apiPut(`/personnel/${id}`, body) : await apiPost('/personnel', body);
    if (result.success) {
        closeModal('personnelModal');
        loadPersonnel();
    } else {
        alert(result.message || 'Error saving personnel');
    }
}

async function deletePersonnel(id) {
    if (confirm('Are you sure you want to delete this personnel?')) {
        const result = await apiDelete(`/personnel/${id}`);
        if (result.success) loadPersonnel();
    }
}

// ===================== CONTACTS =====================

async function loadContacts() {
    const filter = document.getElementById('contactFilter').value;
    const queryParam = filter ? `?status=${filter}` : '';
    try {
        const data = await apiGet(`/contacts${queryParam}`);
        const container = document.getElementById('contactsList');
        if (data.data && data.data.length > 0) {
            container.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>Name</th><th>Category</th><th>Contact</th><th>Email</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${data.data.map(c => `
                            <tr>
                                <td>${c.name}</td>
                                <td>${c.category}</td>
                                <td>${c.contact}</td>
                                <td>${c.email}</td>
                                <td>
                                    <select onchange="updateContactStatus('${c._id}', this.value)" class="status-select">
                                        <option value="new" ${c.status === 'new' ? 'selected' : ''}>New</option>
                                        <option value="in_progress" ${c.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                                        <option value="resolved" ${c.status === 'resolved' ? 'selected' : ''}>Resolved</option>
                                        <option value="closed" ${c.status === 'closed' ? 'selected' : ''}>Closed</option>
                                    </select>
                                </td>
                                <td>${new Date(c.createdAt).toLocaleDateString()}</td>
                                <td class="actions">
                                    <button class="edit-btn" onclick="viewContact('${c._id}')">View</button>
                                    <button class="delete-btn" onclick="deleteContact('${c._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = '<p class="empty-state">No contact messages found.</p>';
        }
    } catch (err) { console.error(err); }
}

async function updateContactStatus(id, status) {
    await apiPut(`/contacts/${id}`, { status });
}

async function viewContact(id) {
    const data = await apiGet(`/contacts/${id}`);
    if (data.success) {
        const c = data.data;
        alert(`Name: ${c.name}\nEmail: ${c.email}\nContact: ${c.contact}\nBranch: ${c.branch}\nCategory: ${c.category}\n\nMessage:\n${c.message}`);
    }
}

async function deleteContact(id) {
    if (confirm('Delete this contact message?')) {
        const result = await apiDelete(`/contacts/${id}`);
        if (result.success) loadContacts();
    }
}

// ===================== CAREERS =====================

async function loadCareers() {
    try {
        const data = await apiGet('/careers/all');
        const container = document.getElementById('careersList');
        if (data.data && data.data.length > 0) {
            container.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>Title</th><th>Department</th><th>Location</th><th>Type</th><th>Closing</th><th>Active</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${data.data.map(c => `
                            <tr>
                                <td>${c.title}</td>
                                <td>${c.department}</td>
                                <td>${c.location}</td>
                                <td>${c.type}</td>
                                <td>${c.closingDate ? new Date(c.closingDate).toLocaleDateString() : 'N/A'}</td>
                                <td>${c.isActive ? '✓' : '✗'}</td>
                                <td class="actions">
                                    <button class="edit-btn" onclick="editCareer('${c._id}')">Edit</button>
                                    <button class="delete-btn" onclick="deleteCareer('${c._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = '<p class="empty-state">No career listings found.</p>';
        }
    } catch (err) { console.error(err); }
}

function showCareerForm(data = null) {
    document.getElementById('careerFormTitle').textContent = data ? 'Edit Career' : 'Add Career';
    document.getElementById('careerId').value = data ? data._id : '';
    document.getElementById('cTitle').value = data ? data.title : '';
    document.getElementById('cDepartment').value = data ? data.department : '';
    document.getElementById('cLocation').value = data ? data.location || 'Colombo' : 'Colombo';
    document.getElementById('cType').value = data ? data.type : 'full-time';
    document.getElementById('cDescription').value = data ? data.description || '' : '';
    document.getElementById('cRequirements').value = data && data.requirements ? data.requirements.join(', ') : '';
    document.getElementById('cClosingDate').value = data && data.closingDate ? data.closingDate.split('T')[0] : '';
    document.getElementById('careerModal').style.display = 'flex';
}

async function editCareer(id) {
    const data = await apiGet(`/careers/${id}`);
    if (data.success) showCareerForm(data.data);
}

async function saveCareer(e) {
    e.preventDefault();
    const id = document.getElementById('careerId').value;
    const body = {
        title: document.getElementById('cTitle').value,
        department: document.getElementById('cDepartment').value,
        location: document.getElementById('cLocation').value,
        type: document.getElementById('cType').value,
        description: document.getElementById('cDescription').value,
        requirements: document.getElementById('cRequirements').value.split(',').map(s => s.trim()).filter(Boolean),
        closingDate: document.getElementById('cClosingDate').value || undefined
    };

    const result = id ? await apiPut(`/careers/${id}`, body) : await apiPost('/careers', body);
    if (result.success) {
        closeModal('careerModal');
        loadCareers();
    } else {
        alert(result.message || 'Error saving career');
    }
}

async function deleteCareer(id) {
    if (confirm('Delete this career listing?')) {
        const result = await apiDelete(`/careers/${id}`);
        if (result.success) loadCareers();
    }
}

// ===================== ALERTS =====================

async function loadAlerts() {
    try {
        const data = await apiGet('/alerts/all');
        const container = document.getElementById('alertsList');
        if (data.data && data.data.length > 0) {
            container.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>Title</th><th>Type</th><th>Active</th><th>Expiry</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${data.data.map(a => `
                            <tr>
                                <td>${a.title}</td>
                                <td><span class="status-badge status-${a.type === 'info' ? 'new' : a.type === 'warning' ? 'in_progress' : a.type === 'critical' ? 'closed' : 'resolved'}">${a.type}</span></td>
                                <td>${a.isActive ? '✓' : '✗'}</td>
                                <td>${a.expiryDate ? new Date(a.expiryDate).toLocaleDateString() : 'None'}</td>
                                <td class="actions">
                                    <button class="edit-btn" onclick="editAlert('${a._id}')">Edit</button>
                                    <button class="delete-btn" onclick="deleteAlert('${a._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = '<p class="empty-state">No service alerts found.</p>';
        }
    } catch (err) { console.error(err); }
}

function showAlertForm(data = null) {
    document.getElementById('alertFormTitle').textContent = data ? 'Edit Alert' : 'Add Alert';
    document.getElementById('alertId').value = data ? data._id : '';
    document.getElementById('aTitle').value = data ? data.title : '';
    document.getElementById('aContent').value = data ? data.content : '';
    document.getElementById('aType').value = data ? data.type : 'info';
    document.getElementById('aExpiryDate').value = data && data.expiryDate ? data.expiryDate.split('T')[0] : '';
    document.getElementById('alertModal').style.display = 'flex';
}

async function editAlert(id) {
    const data = await apiGet(`/alerts/${id}`);
    if (data.success) showAlertForm(data.data);
}

async function saveAlert(e) {
    e.preventDefault();
    const id = document.getElementById('alertId').value;
    const body = {
        title: document.getElementById('aTitle').value,
        content: document.getElementById('aContent').value,
        type: document.getElementById('aType').value,
        expiryDate: document.getElementById('aExpiryDate').value || undefined
    };

    const result = id ? await apiPut(`/alerts/${id}`, body) : await apiPost('/alerts', body);
    if (result.success) {
        closeModal('alertModal');
        loadAlerts();
    } else {
        window.alert(result.message || 'Error saving alert');
    }
}

async function deleteAlert(id) {
    if (confirm('Delete this alert?')) {
        const result = await apiDelete(`/alerts/${id}`);
        if (result.success) loadAlerts();
    }
}

// ===================== BRANCHES =====================

async function loadBranches() {
    try {
        const data = await apiGet('/branches/all');
        const container = document.getElementById('branchesList');
        if (data.data && data.data.length > 0) {
            container.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>Name</th><th>Province</th><th>District</th><th>Phone</th><th>Email</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${data.data.map(b => `
                            <tr>
                                <td>${b.name}</td>
                                <td>${b.province}</td>
                                <td>${b.district || '-'}</td>
                                <td>${b.phone || '-'}</td>
                                <td>${b.email || '-'}</td>
                                <td class="actions">
                                    <button class="edit-btn" onclick="editBranch('${b._id}')">Edit</button>
                                    <button class="delete-btn" onclick="deleteBranch('${b._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = '<p class="empty-state">No branches found.</p>';
        }
    } catch (err) { console.error(err); }
}

function showBranchForm(data = null) {
    document.getElementById('branchFormTitle').textContent = data ? 'Edit Branch' : 'Add Branch';
    document.getElementById('branchId').value = data ? data._id : '';
    document.getElementById('bName').value = data ? data.name : '';
    document.getElementById('bProvince').value = data ? data.province : 'Western';
    document.getElementById('bAddress').value = data ? data.address : '';
    document.getElementById('bDistrict').value = data ? data.district || '' : '';
    document.getElementById('bPhone').value = data ? data.phone || '' : '';
    document.getElementById('bEmail').value = data ? data.email || '' : '';
    document.getElementById('bFax').value = data ? data.fax || '' : '';
    document.getElementById('branchModal').style.display = 'flex';
}

async function editBranch(id) {
    const data = await apiGet(`/branches/${id}`);
    if (data.success) showBranchForm(data.data);
}

async function saveBranch(e) {
    e.preventDefault();
    const id = document.getElementById('branchId').value;
    const body = {
        name: document.getElementById('bName').value,
        province: document.getElementById('bProvince').value,
        address: document.getElementById('bAddress').value,
        district: document.getElementById('bDistrict').value,
        phone: document.getElementById('bPhone').value,
        email: document.getElementById('bEmail').value,
        fax: document.getElementById('bFax').value
    };

    const result = id ? await apiPut(`/branches/${id}`, body) : await apiPost('/branches', body);
    if (result.success) {
        closeModal('branchModal');
        loadBranches();
    } else {
        alert(result.message || 'Error saving branch');
    }
}

async function deleteBranch(id) {
    if (confirm('Delete this branch?')) {
        const result = await apiDelete(`/branches/${id}`);
        if (result.success) loadBranches();
    }
}

// ===================== LOAN PRODUCTS =====================

async function loadLoans() {
    try {
        const data = await apiGet('/loan-products/all');
        const container = document.getElementById('loansList');
        if (data.data && data.data.length > 0) {
            container.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>Name</th><th>Category</th><th>Rate (%)</th><th>Max Amount</th><th>Max Term</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${data.data.map(l => `
                            <tr>
                                <td>${l.name}</td>
                                <td>${l.category}</td>
                                <td>${l.interestRate || '-'}</td>
                                <td>${l.maxAmount ? 'LKR ' + l.maxAmount.toLocaleString() : '-'}</td>
                                <td>${l.maxTerm ? l.maxTerm + ' months' : '-'}</td>
                                <td class="actions">
                                    <button class="edit-btn" onclick="editLoan('${l._id}')">Edit</button>
                                    <button class="delete-btn" onclick="deleteLoan('${l._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = '<p class="empty-state">No loan products found.</p>';
        }
    } catch (err) { console.error(err); }
}

function showLoanForm(data = null) {
    document.getElementById('loanFormTitle').textContent = data ? 'Edit Loan Product' : 'Add Loan Product';
    document.getElementById('loanId').value = data ? data._id : '';
    document.getElementById('lName').value = data ? data.name : '';
    document.getElementById('lCategory').value = data ? data.category : 'personal';
    document.getElementById('lInterestRate').value = data ? data.interestRate || '' : '';
    document.getElementById('lMaxAmount').value = data ? data.maxAmount || '' : '';
    document.getElementById('lMaxTerm').value = data ? data.maxTerm || '' : '';
    document.getElementById('lDescription').value = data ? data.description || '' : '';
    document.getElementById('lEligibility').value = data && data.eligibility ? data.eligibility.join(', ') : '';
    document.getElementById('lFeatures').value = data && data.features ? data.features.join(', ') : '';
    document.getElementById('lDocuments').value = data && data.requiredDocuments ? data.requiredDocuments.join(', ') : '';
    document.getElementById('loanModal').style.display = 'flex';
}

async function editLoan(id) {
    const data = await apiGet(`/loan-products/${id}`);
    if (data.success) showLoanForm(data.data);
}

async function saveLoan(e) {
    e.preventDefault();
    const id = document.getElementById('loanId').value;
    const body = {
        name: document.getElementById('lName').value,
        category: document.getElementById('lCategory').value,
        interestRate: parseFloat(document.getElementById('lInterestRate').value) || undefined,
        maxAmount: parseInt(document.getElementById('lMaxAmount').value) || undefined,
        maxTerm: parseInt(document.getElementById('lMaxTerm').value) || undefined,
        description: document.getElementById('lDescription').value,
        eligibility: document.getElementById('lEligibility').value.split(',').map(s => s.trim()).filter(Boolean),
        features: document.getElementById('lFeatures').value.split(',').map(s => s.trim()).filter(Boolean),
        requiredDocuments: document.getElementById('lDocuments').value.split(',').map(s => s.trim()).filter(Boolean)
    };

    const result = id ? await apiPut(`/loan-products/${id}`, body) : await apiPost('/loan-products', body);
    if (result.success) {
        closeModal('loanModal');
        loadLoans();
    } else {
        alert(result.message || 'Error saving loan product');
    }
}

async function deleteLoan(id) {
    if (confirm('Delete this loan product?')) {
        const result = await apiDelete(`/loan-products/${id}`);
        if (result.success) loadLoans();
    }
}

// ===================== UTILS =====================

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Close modals on outside click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// ===================== SAVINGS PRODUCTS =====================

async function loadSavings() {
    try {
        const data = await apiGet('/savings-products/all');
        const container = document.getElementById('savingsList');
        if (data.data && data.data.length > 0) {
            container.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>Name</th><th>Category</th><th>Interest Rate (%)</th><th>Min Deposit</th><th>Tenure</th><th>Active</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${data.data.map(s => `
                            <tr>
                                <td>${s.name}</td>
                                <td>${s.category.replace(/_/g, ' ')}</td>
                                <td>${s.interestRate}</td>
                                <td>${s.minDeposit ? 'LKR ' + s.minDeposit.toLocaleString() : '-'}</td>
                                <td>${s.tenure || '-'}</td>
                                <td>${s.isActive ? '✓' : '✗'}</td>
                                <td class="actions">
                                    <button class="edit-btn" onclick="editSavings('${s._id}')">Edit</button>
                                    <button class="delete-btn" onclick="deleteSavings('${s._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = '<p class="empty-state">No savings products found.</p>';
        }
    } catch (err) { console.error(err); }
}

function showSavingsForm(data = null) {
    document.getElementById('savingsFormTitle').textContent = data ? 'Edit Savings Product' : 'Add Savings Product';
    document.getElementById('savingsId').value = data ? data._id : '';
    document.getElementById('sName').value = data ? data.name : '';
    document.getElementById('sCategory').value = data ? data.category : 'savings';
    document.getElementById('sInterestRate').value = data ? data.interestRate : '';
    document.getElementById('sTenure').value = data ? data.tenure || '' : '';
    document.getElementById('sMinDeposit').value = data ? data.minDeposit || '' : '';
    document.getElementById('sMaxDeposit').value = data ? data.maxDeposit || '' : '';
    document.getElementById('sDescription').value = data ? data.description || '' : '';
    document.getElementById('sEligibility').value = data && data.eligibility ? data.eligibility.join(', ') : '';
    document.getElementById('sFeatures').value = data && data.features ? data.features.join(', ') : '';
    document.getElementById('sDocuments').value = data && data.requiredDocuments ? data.requiredDocuments.join(', ') : '';
    document.getElementById('savingsModal').style.display = 'flex';
}

async function editSavings(id) {
    const data = await apiGet(`/savings-products/${id}`);
    if (data.success) showSavingsForm(data.data);
}

async function saveSavings(e) {
    e.preventDefault();
    const id = document.getElementById('savingsId').value;
    const body = {
        name: document.getElementById('sName').value,
        category: document.getElementById('sCategory').value,
        interestRate: parseFloat(document.getElementById('sInterestRate').value),
        tenure: document.getElementById('sTenure').value || undefined,
        minDeposit: parseInt(document.getElementById('sMinDeposit').value) || 0,
        maxDeposit: parseInt(document.getElementById('sMaxDeposit').value) || undefined,
        description: document.getElementById('sDescription').value,
        eligibility: document.getElementById('sEligibility').value.split(',').map(s => s.trim()).filter(Boolean),
        features: document.getElementById('sFeatures').value.split(',').map(s => s.trim()).filter(Boolean),
        requiredDocuments: document.getElementById('sDocuments').value.split(',').map(s => s.trim()).filter(Boolean)
    };

    const result = id ? await apiPut(`/savings-products/${id}`, body) : await apiPost('/savings-products', body);
    if (result.success) {
        closeModal('savingsModal');
        loadSavings();
    } else {
        alert(result.message || 'Error saving savings product');
    }
}

async function deleteSavings(id) {
    if (confirm('Delete this savings product?')) {
        const result = await apiDelete(`/savings-products/${id}`);
        if (result.success) loadSavings();
    }
}

// ===================== NEWS =====================

async function loadNews() {
    try {
        const data = await apiGet('/news/all');
        const container = document.getElementById('newsList');
        if (data.data && data.data.length > 0) {
            container.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>Title</th><th>Category</th><th>Published</th><th>Featured</th><th>Date</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${data.data.map(n => `
                            <tr>
                                <td>${n.title}</td>
                                <td>${n.category}</td>
                                <td>${n.isPublished ? '✓' : '✗'}</td>
                                <td>${n.isFeatured ? '⭐' : '-'}</td>
                                <td>${n.publishDate ? new Date(n.publishDate).toLocaleDateString() : '-'}</td>
                                <td class="actions">
                                    <button class="edit-btn" onclick="editNews('${n._id}')">Edit</button>
                                    <button class="delete-btn" onclick="deleteNews('${n._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = '<p class="empty-state">No news articles found.</p>';
        }
    } catch (err) { console.error(err); }
}

function showNewsForm(data = null) {
    document.getElementById('newsFormTitle').textContent = data ? 'Edit News' : 'Add News';
    document.getElementById('newsId').value = data ? data._id : '';
    document.getElementById('nTitle').value = data ? data.title : '';
    document.getElementById('nCategory').value = data ? data.category : 'general';
    document.getElementById('nSummary').value = data ? data.summary || '' : '';
    document.getElementById('nContent').value = data ? data.content : '';
    document.getElementById('nPublishDate').value = data && data.publishDate ? data.publishDate.split('T')[0] : '';
    document.getElementById('nExpiryDate').value = data && data.expiryDate ? data.expiryDate.split('T')[0] : '';
    document.getElementById('nPublished').checked = data ? data.isPublished : true;
    document.getElementById('nFeatured').checked = data ? data.isFeatured : false;
    document.getElementById('newsModal').style.display = 'flex';
}

async function editNews(id) {
    const data = await apiGet(`/news/${id}`);
    if (data.success) showNewsForm(data.data);
}

async function saveNews(e) {
    e.preventDefault();
    const id = document.getElementById('newsId').value;
    const body = {
        title: document.getElementById('nTitle').value,
        category: document.getElementById('nCategory').value,
        summary: document.getElementById('nSummary').value,
        content: document.getElementById('nContent').value,
        publishDate: document.getElementById('nPublishDate').value || undefined,
        expiryDate: document.getElementById('nExpiryDate').value || undefined,
        isPublished: document.getElementById('nPublished').checked,
        isFeatured: document.getElementById('nFeatured').checked
    };

    const result = id ? await apiPut(`/news/${id}`, body) : await apiPost('/news', body);
    if (result.success) {
        closeModal('newsModal');
        loadNews();
    } else {
        alert(result.message || 'Error saving news');
    }
}

async function deleteNews(id) {
    if (confirm('Delete this news article?')) {
        const result = await apiDelete(`/news/${id}`);
        if (result.success) loadNews();
    }
}

// ===================== COMPLAINTS =====================

async function loadComplaints() {
    const statusFilter = document.getElementById('complaintStatusFilter').value;
    const queryParam = statusFilter ? `?status=${statusFilter}` : '';
    try {
        const data = await apiGet(`/complaints${queryParam}`);
        const container = document.getElementById('complaintsList');

        if (data.data && data.data.length > 0) {
            const table = document.createElement('table');
            table.className = 'data-table';
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.data.map(complaint => `
                        <tr>
                            <td>${complaint.title}</td>
                            <td><span style="background: #e3f2fd; padding: 3px 8px; border-radius: 3px; font-size: 0.85rem;">${complaint.category}</span></td>
                            <td>
                                <span style="background: ${
                                    complaint.priority === 'critical' ? '#ffebee' :
                                    complaint.priority === 'high' ? '#fff3e0' :
                                    complaint.priority === 'medium' ? '#fff9c4' : '#f1f8e9'
                                }; padding: 3px 8px; border-radius: 3px; font-size: 0.85rem; color: ${
                                    complaint.priority === 'critical' ? '#c62828' :
                                    complaint.priority === 'high' ? '#e65100' :
                                    complaint.priority === 'medium' ? '#f57f17' : '#558b2f'
                                };">${complaint.priority}</span>
                            </td>
                            <td>${complaint.customerName}</td>
                            <td><span class="status-badge status-${complaint.status}">${complaint.status}</span></td>
                            <td>${new Date(complaint.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button class="action-btn" onclick="viewComplaint('${complaint._id}')" style="background: #0099ab; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer;">View</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            container.innerHTML = '';
            container.appendChild(table);
        } else {
            container.innerHTML = '<p class="empty-state">No complaints found.</p>';
        }
    } catch (err) {
        console.error('Error loading complaints:', err);
    }
}

async function viewComplaint(complaintId) {
    const data = await apiGet(`/complaints/${complaintId}`);
    
    if (!data.success || !data.data) {
        alert('Complaint not found');
        return;
    }

    const complaint = data.data;
    document.getElementById('complaintId').value = complaint._id;
    document.getElementById('complaintIdDisplay').textContent = complaint._id;
    document.getElementById('complaintDateDisplay').textContent = new Date(complaint.createdAt).toLocaleString();
    document.getElementById('compTitle').value = complaint.title;
    document.getElementById('compCategory').value = complaint.category;
    document.getElementById('cPriority').value = complaint.priority;
    document.getElementById('cStatus').value = complaint.status;
    document.getElementById('cCustomerName').value = complaint.customerName;
    document.getElementById('cEmail').value = complaint.email;
    document.getElementById('cPhone').value = complaint.phone;
    document.getElementById('cAccountNumber').value = complaint.accountNumber || '';
    document.getElementById('cBranchName').value = complaint.branchName;
    document.getElementById('compDescription').value = complaint.description;
    document.getElementById('cAdminNotes').value = complaint.adminNotes || '';
    document.getElementById('cSatisfaction').value = complaint.customerSatisfaction || 'not_rated';
    document.getElementById('cCompensation').value = complaint.compensationOffered || '';

    document.getElementById('complaintFormTitle').textContent = 'Complaint Details';
    document.getElementById('complaintModal').style.display = 'block';
}

async function saveComplaint(event) {
    event.preventDefault();
    const id = document.getElementById('complaintId').value;

    const body = {
        status: document.getElementById('cStatus').value,
        adminNotes: document.getElementById('cAdminNotes').value,
        customerSatisfaction: document.getElementById('cSatisfaction').value,
        compensationOffered: document.getElementById('cCompensation').value
    };

    const result = id ? await apiPut(`/complaints/${id}`, body) : null;
    if (result && result.success) {
        closeModal('complaintModal');
        loadComplaints();
        alert('Complaint updated successfully');
    } else if (result) {
        alert(result.message || 'Error updating complaint');
    }
}

async function deleteComplaint() {
    const id = document.getElementById('complaintId').value;
    if (confirm('Delete this complaint? This action cannot be undone.')) {
        const result = await apiDelete(`/complaints/${id}`);
        if (result.success) {
            closeModal('complaintModal');
            loadComplaints();
            alert('Complaint deleted successfully');
        } else {
            alert(result.message || 'Error deleting complaint');
        }
    }
}

// ===================== AWARDS =====================

async function loadAwards() {
    try {
        const data = await apiGet('/awards/all');
        const container = document.getElementById('awardsList');

        if (data.data && data.data.length > 0) {
            container.innerHTML = `
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Organization</th>
                            <th>Year</th>
                            <th>Category</th>
                            <th>Published</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.data.map(award => `
                            <tr>
                                <td><img src="${award.image || '../Assests/achievement.png'}" alt="${award.title}" style="width:50px;height:50px;object-fit:cover;border-radius:4px;"></td>
                                <td>${award.title}</td>
                                <td>${award.organization}</td>
                                <td>${award.year || '-'}</td>
                                <td><span style="background: #e3f2fd; padding: 3px 8px; border-radius: 3px; font-size: 0.85rem;">${award.category}</span></td>
                                <td>${award.isPublished ? '✓' : '✗'}</td>
                                <td>${award.isFeatured ? '⭐' : '-'}</td>
                                <td class="actions">
                                    <button class="edit-btn" onclick="editAward('${award._id}')">Edit</button>
                                    <button class="delete-btn" onclick="deleteAward('${award._id}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            container.innerHTML = '<p class="empty-state">No awards found. Click "+ Add Award" to create one.</p>';
        }
    } catch (err) {
        console.error('Error loading awards:', err);
        document.getElementById('awardsList').innerHTML = '<p class="error-state">Error loading awards.</p>';
    }
}

function showAwardForm(data = null) {
    document.getElementById('awardFormTitle').textContent = data ? 'Edit Award' : 'Add Award';
    document.getElementById('awardId').value = data ? data._id : '';
    document.getElementById('awTitle').value = data ? data.title : '';
    document.getElementById('awOrganization').value = data ? data.organization : '';
    document.getElementById('awDescription').value = data ? data.description : '';
    document.getElementById('awYear').value = data ? data.year : new Date().getFullYear();
    document.getElementById('awCategory').value = data ? data.category : 'excellence';
    document.getElementById('awImage').value = data ? data.image || '' : '';
    document.getElementById('awDisplayOrder').value = data ? data.displayOrder || 0 : 0;
    document.getElementById('awPublished').checked = data ? data.isPublished : true;
    document.getElementById('awFeatured').checked = data ? data.isFeatured : false;
    document.getElementById('awardModal').style.display = 'flex';
}

async function editAward(id) {
    const data = await apiGet(`/awards/${id}`);
    if (data.success) showAwardForm(data.data);
}

async function saveAward(e) {
    e.preventDefault();
    const id = document.getElementById('awardId').value;
    const body = {
        title: document.getElementById('awTitle').value,
        organization: document.getElementById('awOrganization').value,
        description: document.getElementById('awDescription').value,
        year: parseInt(document.getElementById('awYear').value) || new Date().getFullYear(),
        category: document.getElementById('awCategory').value,
        image: document.getElementById('awImage').value || '../Assests/achievement.png',
        displayOrder: parseInt(document.getElementById('awDisplayOrder').value) || 0,
        isPublished: document.getElementById('awPublished').checked,
        isFeatured: document.getElementById('awFeatured').checked
    };

    const result = id ? await apiPut(`/awards/${id}`, body) : await apiPost('/awards', body);
    if (result.success) {
        closeModal('awardModal');
        loadAwards();
        alert(id ? 'Award updated successfully' : 'Award created successfully');
    } else {
        alert(result.message || 'Error saving award');
    }
}

async function deleteAward(id) {
    if (confirm('Delete this award? This action cannot be undone.')) {
        const result = await apiDelete(`/awards/${id}`);
        if (result.success) {
            loadAwards();
            alert('Award deleted successfully');
        } else {
            alert(result.message || 'Error deleting award');
        }
    }
}
