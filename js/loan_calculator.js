// Loan Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get all input elements
    const loanAmount = document.getElementById('loanAmount');
    const loanAmountRange = document.getElementById('loanAmountRange');
    const interestRate = document.getElementById('interestRate');
    const interestRateRange = document.getElementById('interestRateRange');
    const loanTenure = document.getElementById('loanTenure');
    const loanTenureRange = document.getElementById('loanTenureRange');
    const tenureType = document.getElementById('tenureType');
    const resetBtn = document.getElementById('resetBtn');

    // Get result elements
    const monthlyEMI = document.getElementById('monthlyEMI');
    const totalInterest = document.getElementById('totalInterest');
    const totalPayment = document.getElementById('totalPayment');
    const principalAmount = document.getElementById('principalAmount');
    const interestAmount = document.getElementById('interestAmount');
    const principalBar = document.getElementById('principalBar');
    const interestBar = document.getElementById('interestBar');

    // Category tabs functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryGroups = document.querySelectorAll('.category-group');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all category groups
            categoryGroups.forEach(group => {
                group.style.display = 'none';
                // Remove active from all items in hidden groups
                group.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
            });
            
            // Show the target category group
            const targetGroup = document.querySelector(`.category-group[data-category="${targetCategory}"]`);
            if (targetGroup) {
                targetGroup.style.display = 'flex';
                // Set first item as active
                const firstItem = targetGroup.querySelector('.category-item');
                if (firstItem) {
                    firstItem.classList.add('active');
                    const newRate = firstItem.getAttribute('data-rate');
                    interestRate.value = newRate;
                    interestRateRange.value = newRate;
                    calculateEMI();
                }
            }
        });
    });

    // Category selection functionality
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the parent group
            const parentGroup = this.closest('.category-group');
            
            // Remove active class from all categories in this group
            if (parentGroup) {
                parentGroup.querySelectorAll('.category-item').forEach(cat => cat.classList.remove('active'));
            }
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Get the interest rate for this category
            const newRate = this.getAttribute('data-rate');
            
            // Update interest rate inputs
            interestRate.value = newRate;
            interestRateRange.value = newRate;
            
            // Recalculate EMI
            calculateEMI();
        });
    });

    // Sync input and range slider for loan amount
    loanAmount.addEventListener('input', function() {
        loanAmountRange.value = this.value;
        calculateEMI();
    });

    loanAmountRange.addEventListener('input', function() {
        loanAmount.value = this.value;
        calculateEMI();
    });

    // Sync input and range slider for interest rate
    interestRate.addEventListener('input', function() {
        interestRateRange.value = this.value;
        calculateEMI();
    });

    interestRateRange.addEventListener('input', function() {
        interestRate.value = this.value;
        calculateEMI();
    });

    // Sync input and range slider for loan tenure
    loanTenure.addEventListener('input', function() {
        loanTenureRange.value = this.value;
        calculateEMI();
    });

    loanTenureRange.addEventListener('input', function() {
        loanTenure.value = this.value;
        calculateEMI();
    });

    // Update tenure type
    tenureType.addEventListener('change', function() {
        if (this.value === 'months') {
            loanTenureRange.max = 360; // 30 years in months
            if (parseInt(loanTenure.value) > 360) {
                loanTenure.value = 360;
                loanTenureRange.value = 360;
            }
        } else {
            loanTenureRange.max = 30;
            if (parseInt(loanTenure.value) > 30) {
                loanTenure.value = 30;
                loanTenureRange.value = 30;
            }
        }
        calculateEMI();
    });

    // Reset button
    resetBtn.addEventListener('click', function() {
        loanAmount.value = 0;
        loanAmountRange.value = 0;
        interestRate.value = 0;
        interestRateRange.value = 0;
        loanTenure.value = 0;
        loanTenureRange.value = 0;
        tenureType.value = 'years';
        loanTenureRange.max = 30;
        calculateEMI();
    });

    // Calculate EMI function
    function calculateEMI() {
        // Get values
        const principal = parseFloat(loanAmount.value) || 0;
        const annualRate = parseFloat(interestRate.value) || 0;
        let tenure = parseFloat(loanTenure.value) || 0;

        // Convert tenure to months if in years
        const tenureInMonths = tenureType.value === 'years' ? tenure * 12 : tenure;

        // Calculate monthly interest rate
        const monthlyRate = annualRate / 12 / 100;

        // Calculate EMI using formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
        let emi = 0;
        if (monthlyRate === 0) {
            // If interest rate is 0, EMI is simply principal divided by tenure
            emi = principal / tenureInMonths;
        } else {
            const x = Math.pow(1 + monthlyRate, tenureInMonths);
            emi = (principal * monthlyRate * x) / (x - 1);
        }

        // Calculate total payment and interest
        const totalPay = emi * tenureInMonths;
        const totalInt = totalPay - principal;

        // Update results
        monthlyEMI.textContent = `LKR ${formatNumber(Math.round(emi))}`;
        totalInterest.textContent = `LKR ${formatNumber(Math.round(totalInt))}`;
        totalPayment.textContent = `LKR ${formatNumber(Math.round(totalPay))}`;
        principalAmount.textContent = `LKR ${formatNumber(Math.round(principal))}`;
        interestAmount.textContent = `LKR ${formatNumber(Math.round(totalInt))}`;

        // Update chart
        const principalPercentage = (principal / totalPay) * 100;
        const interestPercentage = (totalInt / totalPay) * 100;

        principalBar.style.width = `${principalPercentage}%`;
        interestBar.style.width = `${interestPercentage}%`;

        // Update labels visibility based on width
        if (principalPercentage < 15) {
            principalBar.querySelector('.bar-label').style.display = 'none';
        } else {
            principalBar.querySelector('.bar-label').style.display = 'block';
        }

        if (interestPercentage < 15) {
            interestBar.querySelector('.bar-label').style.display = 'none';
        } else {
            interestBar.querySelector('.bar-label').style.display = 'block';
        }
    }

    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Initial calculation
    calculateEMI();
});
