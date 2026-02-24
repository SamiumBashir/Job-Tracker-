class JobTracker {
    constructor() {
        // Initialize jobs
        this.jobs = [
            { id: 1, type: 'pending' },
            { id: 2, type: 'pending' },
            { id: 3, type: 'pending' },
            { id: 4, type: 'pending' },
            { id: 5, type: 'pending' },
            { id: 6, type: 'pending' },
            { id: 7, type: 'pending' },
            { id: 8, type: 'pending' },
        ];
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.updateStats();
    }

    attachEventListeners() {
        // Mark as Interview
        document.querySelectorAll('.accepted').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const id = this.getCardId(e);
                this.markAsInterview(id);
            });
        });

        // Mark as Rejected
        document.querySelectorAll('.decline').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const id = this.getCardId(e);
                this.markAsRejected(id);
            });
        });

        // Delete job
        document.querySelectorAll('.delete-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const id = this.getCardId(e);
                this.deleteJob(id);
            });
        });

        // Filter buttons
        document.getElementById('allJob').addEventListener('click', () => this.filterJobs('all'));
        document.getElementById('acceptedJob').addEventListener('click', () => this.filterJobs('accepted'));
        document.getElementById('declineJob').addEventListener('click', () => this.filterJobs('declined'));
    }

    // Get card id from clicked button
    getCardId(event) {
        const card = event.target.closest('.main-jobs-card');
        return parseInt(card.id.replace('jobCard', ''));
    }

    // Mark job as Interview
    markAsInterview(id) {
        const job = this.jobs.find(job => job.id === id);
        if (!job) return;

        job.type = 'accepted';
        this.updateJobCard(id, 'INTERVIEW', '#10B981');
        this.updateStats();
    }

    // Mark job as Rejected
    markAsRejected(id) {
        const job = this.jobs.find(job => job.id === id);
        if (!job) return;

        job.type = 'declined';
        this.updateJobCard(id, 'REJECTED', '#EF4444');
        this.updateStats();
    }

    // Update job card badge
    updateJobCard(id, status, color) {
        const card = document.getElementById(`jobCard${id}`);
        if (!card) return;

        const batch = card.querySelector('.batch');
        if (!batch) return;

        batch.textContent = status;
        batch.style.backgroundColor = color;
        batch.style.color = 'white';
    }

    // Delete job card
    deleteJob(id) {
        const card = document.getElementById(`jobCard${id}`);
        if (!card) return;

        card.remove();
        this.jobs = this.jobs.filter(job => job.id !== id);
        this.updateStats();
    }

    // Filter jobs
    filterJobs(filter) {
        const cards = document.querySelectorAll('.main-jobs-card');
        let anyVisible = false;

        cards.forEach((card) => {
            const id = parseInt(card.id.replace('jobCard', ''));
            const job = this.jobs.find(job => job.id === id);

            let show = false;

            if (!job) {
                show = false;
            } else if (filter === 'all') {
                show = true;
            } else if (filter === 'accepted' && job.type === 'accepted') {
                show = true;
            } else if (filter === 'declined' && job.type === 'declined') {
                show = true;
            }

            card.style.display = show ? 'flex' : 'none';
            if (show) anyVisible = true;
        });

        // Show "No Jobs Available" placeholder if nothing visible
        const noJobs = document.getElementById('noJobs');
        if (anyVisible) {
            noJobs.classList.add('hidden');
        } else {
            noJobs.classList.remove('hidden');
        }
    }

    // Update stats counters
    updateStats() {
        const interviewed = this.jobs.filter(job => job.type === 'accepted').length;
        const rejected = this.jobs.filter(job => job.type === 'declined').length;

        document.getElementById('getJob').querySelector('span').textContent = interviewed;
        document.getElementById('rejectJob').querySelector('span').textContent = rejected;
        document.getElementById('totalJob').textContent = `${this.jobs.length} Jobs`;
    }
}

// Initialize after DOM load
document.addEventListener('DOMContentLoaded', () => {
    new JobTracker();
});