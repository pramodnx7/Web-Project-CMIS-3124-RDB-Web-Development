const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Personnel = require('./models/Personnel');
const Branch = require('./models/Branch');
const LoanProduct = require('./models/LoanProduct');
const ServiceAlert = require('./models/ServiceAlert');
const News = require('./models/News');

const connectDB = require('./config/db');

const seedData = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB Atlas...');

        // Clear existing data
        await User.deleteMany({});
        await Personnel.deleteMany({});
        await Branch.deleteMany({});
        await LoanProduct.deleteMany({});
        await ServiceAlert.deleteMany({});
        await News.deleteMany({});
        console.log('Cleared existing data.');

        // --- Create admin user ---
        const admin = await User.create({
            username: 'admin',
            email: 'admin@rdb.lk',
            password: 'admin123',
            role: 'admin'
        });
        console.log('Admin user created: admin / admin123');

        // --- Seed Personnel ---
        const personnel = await Personnel.insertMany([
            {
                name: 'Mr. Ranjith Kodituwakku',
                position: 'Chairman',
                category: 'chairman',
                description: 'Mr. Ranjith Kodituwakku serves as the Chairman of Regional Development Bank, bringing extensive experience in banking and financial sector management.',
                phone: '(+94) 11 2 350000',
                email: 'chairman@rdb.lk',
                office: 'Head Office, Colombo 02',
                photo: '../Assests/Images/chairman.png',
                order: 1
            },
            {
                name: 'Mr. Asanga Tennakoon',
                position: 'General Manager / Chief Executive Officer',
                category: 'general_manager',
                description: 'Mr. Asanga Tennakoon currently serves as the General Manager and Chief Executive Officer of the Regional Development Bank. With over 25 years of experience in the banking and financial services industry, he brings a wealth of knowledge and strategic vision to the role.',
                phone: '(+94) 11 2 350001',
                email: 'gm@rdb.lk',
                office: 'Head Office, Colombo 02',
                photo: '../Assests/genmanager.png',
                order: 1
            },
            {
                name: 'Mr. Asoka Bandara',
                position: 'Director',
                category: 'board_of_directors',
                description: 'Member of the Board of Directors of Regional Development Bank.',
                photo: '../Assests/Images/asoka_bandara.png',
                order: 1
            },
            {
                name: 'Mrs. Ramani Wijeratne',
                position: 'Director',
                category: 'board_of_directors',
                description: 'Member of the Board of Directors of Regional Development Bank.',
                photo: '../Assests/Images/ramani_wijeratne.png',
                order: 2
            },
            {
                name: 'Mr. PA Wijerathne',
                position: 'Director',
                category: 'board_of_directors',
                description: 'Member of the Board of Directors of Regional Development Bank.',
                photo: '../Assests/Images/pa_wijerathne.png',
                order: 3
            },
            {
                name: 'Mrs. Rohini Madurawala',
                position: 'Director',
                category: 'board_of_directors',
                description: 'Member of the Board of Directors of Regional Development Bank.',
                photo: '../Assests/Images/rohini_madurawala.png',
                order: 4
            },
            {
                name: 'Mr. Kumara Bandara',
                position: 'Director',
                category: 'board_of_directors',
                description: 'Member of the Board of Directors of Regional Development Bank.',
                photo: '../Assests/Images/kumara_bandara.png',
                order: 5
            },
            {
                name: 'Mr. Chanura Wijetillake',
                position: 'Director',
                category: 'board_of_directors',
                description: 'Member of the Board of Directors of Regional Development Bank.',
                photo: '../Assests/Images/chanura_wijetillake.png',
                order: 6
            },
            {
                name: 'Mr. W Ranaweera',
                position: 'Director',
                category: 'board_of_directors',
                description: 'Member of the Board of Directors of Regional Development Bank.',
                photo: '../Assests/Images/w_ranaweera.png',
                order: 7
            },
            {
                name: 'Mrs. Wasanthe Nandasiri',
                position: 'Director',
                category: 'board_of_directors',
                description: 'Member of the Board of Directors of Regional Development Bank.',
                photo: '../Assests/Images/wasanthe_nandasiri.png',
                order: 8
            },
            // Corporate Management
            {
                name: 'Deputy General Manager - Finance',
                position: 'DGM - Finance & Planning',
                category: 'corporate_management',
                description: 'Oversees financial planning, budgeting, and fiscal management of the bank.',
                order: 1
            },
            {
                name: 'Deputy General Manager - Operations',
                position: 'DGM - Operations',
                category: 'corporate_management',
                description: 'Manages day-to-day banking operations and service delivery.',
                order: 2
            },
            {
                name: 'Deputy General Manager - Risk',
                position: 'DGM - Risk Management',
                category: 'corporate_management',
                description: 'Responsible for risk identification, assessment and mitigation strategies.',
                order: 3
            },
            // Executive Management
            {
                name: 'Assistant General Manager - Retail',
                position: 'AGM - Retail Banking',
                category: 'executive_management',
                description: 'Heads retail banking products and personal banking services.',
                order: 1
            },
            {
                name: 'Assistant General Manager - Credit',
                position: 'AGM - Credit Management',
                category: 'executive_management',
                description: 'Manages credit operations, loan approvals, and portfolio quality.',
                order: 2
            },
            {
                name: 'Assistant General Manager - Agriculture',
                position: 'AGM - Agricultural Sector',
                category: 'executive_management',
                description: 'Oversees agricultural lending and rural development initiatives.',
                order: 3
            }
        ]);
        console.log(`${personnel.length} personnel records created.`);

        // --- Seed Branches ---
        const branches = await Branch.insertMany([
            { name: 'Head Office', address: 'No. 16, Sir Chittampalam A. Gardiner Mawatha, Colombo 02', phone: '(+94) 11 2 350000', fax: '(+94) 11 2 350001', email: 'info@rdb.lk', province: 'Western', district: 'Colombo', lat: 6.9344, lng: 79.8428 },
            { name: 'Kandy Branch', address: 'No. 45, Dalada Veediya, Kandy', phone: '(+94) 81 2 234567', email: 'kandy@rdb.lk', province: 'Central', district: 'Kandy', lat: 7.2906, lng: 80.6337 },
            { name: 'Galle Branch', address: 'No. 12, Main Street, Galle', phone: '(+94) 91 2 234567', email: 'galle@rdb.lk', province: 'Southern', district: 'Galle', lat: 6.0535, lng: 80.2210 },
            { name: 'Anuradhapura Branch', address: 'No. 78, Main Street, Anuradhapura', phone: '(+94) 25 2 234567', email: 'anuradhapura@rdb.lk', province: 'North Central', district: 'Anuradhapura', lat: 8.3114, lng: 80.4037 },
            { name: 'Ampara Branch', address: 'No. 34, D.S. Senanayake Mawatha, Ampara', phone: '(+94) 63 2 234567', email: 'ampara@rdb.lk', province: 'Eastern', district: 'Ampara', lat: 7.2975, lng: 81.6820 },
            { name: 'Kurunegala Branch', address: 'No. 56, Colombo Road, Kurunegala', phone: '(+94) 37 2 234567', email: 'kurunegala@rdb.lk', province: 'North Western', district: 'Kurunegala', lat: 7.4863, lng: 80.3623 },
            { name: 'Ratnapura Branch', address: 'No. 23, Main Street, Ratnapura', phone: '(+94) 45 2 234567', email: 'ratnapura@rdb.lk', province: 'Sabaragamuwa', district: 'Ratnapura', lat: 6.6828, lng: 80.3992 },
            { name: 'Jaffna Branch', address: 'No. 15, Hospital Road, Jaffna', phone: '(+94) 21 2 234567', email: 'jaffna@rdb.lk', province: 'Northern', district: 'Jaffna', lat: 9.6615, lng: 80.0255 },
            { name: 'Badulla Branch', address: 'No. 89, Bandaranayake Mawatha, Badulla', phone: '(+94) 55 2 234567', email: 'badulla@rdb.lk', province: 'Uva', district: 'Badulla', lat: 6.9934, lng: 81.0550 }
        ]);
        console.log(`${branches.length} branches created.`);

        // --- Seed Loan Products ---
        const loanProducts = await LoanProduct.insertMany([
            {
                name: 'Kekulu Savings Loan',
                category: 'personal',
                interestRate: 12.5,
                maxAmount: 500000,
                maxTerm: 60,
                description: 'A personal loan product for Kekulu savings account holders.',
                eligibility: ['Must be a Kekulu savings account holder', 'Minimum 6 months account history'],
                features: ['Competitive interest rates', 'Flexible repayment options', 'Quick processing'],
                requiredDocuments: ['NIC copy', 'Salary slip', 'Bank statements'],
                isActive: true
            },
            {
                name: 'Govi Navoda (Agricultural Loan)',
                category: 'agriculture',
                interestRate: 8.0,
                maxAmount: 1000000,
                maxTerm: 120,
                description: 'Supporting agricultural development with subsidized interest rates for farmers.',
                eligibility: ['Registered farmer', 'Valid farming license', 'Minimum 1 acre of cultivable land'],
                features: ['Subsidized interest rate', 'Grace period available', 'Flexible repayment linked to harvest'],
                requiredDocuments: ['NIC copy', 'Farming license', 'Land ownership documents'],
                isActive: true
            },
            {
                name: 'Speed Cash',
                category: 'personal',
                interestRate: 14.0,
                maxAmount: 300000,
                maxTerm: 36,
                description: 'Quick disbursement personal loan for urgent financial needs.',
                eligibility: ['Permanent employee', 'Minimum monthly income LKR 25,000'],
                features: ['Same-day processing', 'No collateral required', 'Minimal documentation'],
                requiredDocuments: ['NIC copy', 'Salary confirmation letter', 'Pay slip'],
                isActive: true
            },
            {
                name: 'RDB Housing Loan',
                category: 'housing',
                interestRate: 10.5,
                maxAmount: 10000000,
                maxTerm: 240,
                description: 'Long-term housing loan for construction, purchase, or renovation of residential property.',
                eligibility: ['Sri Lankan citizen', 'Age 18-55 years', 'Steady income source'],
                features: ['Up to 20-year repayment period', 'Competitive interest rates', 'Flexible repayment options'],
                requiredDocuments: ['NIC copy', 'Income proof', 'Property deed', 'Building plan approval'],
                isActive: true
            },
            {
                name: 'Liya Saviya (SME Loan)',
                category: 'business',
                interestRate: 11.0,
                maxAmount: 5000000,
                maxTerm: 84,
                description: 'Small and Medium Enterprise development loan for business growth.',
                eligibility: ['Registered business', 'Minimum 1 year of operation', 'Valid business registration'],
                features: ['Business development support', 'Flexible collateral options', 'Grace period available'],
                requiredDocuments: ['Business registration', 'Financial statements', 'Business plan', 'NIC of proprietor'],
                isActive: true
            },
            {
                name: 'Pawning Facility',
                category: 'pawning',
                interestRate: 12.0,
                maxAmount: 2000000,
                maxTerm: 12,
                description: 'Gold-backed pawning facility with competitive rates.',
                eligibility: ['Valid NIC holder', '22kt or above gold jewelry'],
                features: ['Instant cash', 'Competitive rates', 'Safe storage of valuables'],
                requiredDocuments: ['NIC copy', 'Gold items for assessment'],
                isActive: true
            },
            {
                name: 'RDB Leasing',
                category: 'leasing',
                interestRate: 13.0,
                maxAmount: 8000000,
                maxTerm: 60,
                description: 'Vehicle and equipment leasing facility for personal and business use.',
                eligibility: ['Sri Lankan citizen', 'Valid driving license for vehicles', 'Steady income'],
                features: ['Flexible down payment', 'Quick approval', 'Insurance facilitation'],
                requiredDocuments: ['NIC copy', 'Income proof', 'Vehicle quotation', 'Driving license'],
                isActive: true
            },
            {
                name: 'Solar Energy Loan',
                category: 'other',
                interestRate: 9.5,
                maxAmount: 3000000,
                maxTerm: 60,
                description: 'Green energy loan for solar panel installation at homes and businesses.',
                eligibility: ['Property owner', 'Valid electricity account', 'Approved solar installer'],
                features: ['Low interest rate', 'Environmental friendly', 'Electricity bill savings'],
                requiredDocuments: ['NIC copy', 'Property deed', 'Solar installation quotation', 'CEB/LECO account'],
                isActive: true
            }
        ]);
        console.log(`${loanProducts.length} loan products created.`);

        // --- Seed News ---
        const news = await News.insertMany([
            {
                title: 'New Agricultural Loan Scheme Launched',
                content: 'RDB introduces a new loan scheme to support farmers with low-interest rates and flexible terms. This initiative aims to strengthen rural communities and boost agricultural productivity across the country.',
                summary: 'RDB introduces a new loan scheme to support farmers with low-interest rates and flexible terms.',
                category: 'announcement',
                image: 'https://picsum.photos/seed/news1/400/250',
                isPublished: true,
                isFeatured: true
            },
            {
                title: 'Annual General Meeting Highlights',
                content: 'Key achievements and future plans discussed at the AGM, showcasing strong growth in rural banking. The bank reported a 15% increase in customer base and expanded services across 9 new districts.',
                summary: 'Key achievements and future plans discussed at the AGM, showcasing strong growth in rural banking.',
                category: 'announcement',
                image: 'https://picsum.photos/seed/news2/400/250',
                isPublished: true,
                isFeatured: true
            },
            {
                title: 'Digital Banking Expansion',
                content: 'RDB expands its digital services to reach more customers in remote areas. The new digital platform ensures seamless banking experience with enhanced security features and 24/7 accessibility.',
                summary: 'RDB expands its digital services to reach more customers in remote areas.',
                category: 'update',
                image: 'https://picsum.photos/seed/news3/400/250',
                isPublished: true,
                isFeatured: true
            },
            {
                title: 'Community Development Initiatives',
                content: 'RDB partners with local communities for sustainable development projects. Through various CSR initiatives, the bank contributes to education, health, and environmental conservation programs.',
                summary: 'RDB partners with local communities for sustainable development projects.',
                category: 'general',
                image: 'https://picsum.photos/seed/news4/400/250',
                isPublished: true,
                isFeatured: false
            }
        ]);
        console.log(`${news.length} news articles created.`);

        // --- Seed Service Alerts ---
        const alerts = await ServiceAlert.insertMany([
            {
                title: 'Online Banking System Maintenance',
                content: 'Our online banking system will undergo scheduled maintenance on Saturday from 10:00 PM to 2:00 AM Sunday. During this period, online transactions may be temporarily unavailable.',
                type: 'maintenance',
                isActive: true,
                expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            },
            {
                title: 'New Branch Opening - Hambantota',
                content: 'We are pleased to announce the opening of our new branch in Hambantota. Visit us at No. 45, Main Street, Hambantota for all your banking needs.',
                type: 'info',
                isActive: true,
                expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
            },
            {
                title: 'Beware of Phishing Scams',
                content: 'RDB will never ask for your PIN, password, or OTP via phone, email, or SMS. Please report any suspicious communication to 1972.',
                type: 'warning',
                isActive: true,
                expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            }
        ]);
        console.log(`${alerts.length} service alerts created.`);

        console.log('\n========================================');
        console.log('  Database seeded successfully!');
        console.log('========================================');
        console.log('  Admin Login:');
        console.log('  Username: admin');
        console.log('  Password: admin123');
        console.log('========================================\n');

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seedData();
