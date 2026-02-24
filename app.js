class JobTracker {
    constructor() {
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
        document.querySelectorAll('#accepted').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const id = this.getCardId(e);
                this.markAsInterview(id);
            });
        });

        document.querySelectorAll('#decline').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const id = this.getCardId(e);
                this.markAsRejected(id);
            });
        });

        document.querySelectorAll('.fa-trash-can').forEach((btn) => {
            btn.parentElement.addEventListener('click', (e) => {
                const id = this.getCardId(e);
                this.deleteJob(id);
            });
        });

        document.getElementById('allJob')
            .addEventListener('click', () => this.filterJobs('all'));

        document.getElementById('acceptedJob')
            .addEventListener('click', () => this.filterJobs('accepted'));

        document.getElementById('declineJob')
            .addEventListener('click', () => this.filterJobs('declined'));
    }

    getCardId(event) {
        const card = event.target.closest('.main-jobs-card');
        return parseInt(card.id.replace('jobCard', ''));
    }

    markAsInterview(id) {
        const job = this.jobs.find(job => job.id === id);
        if (!job) return;

        job.type = 'accepted';
        this.updateJobCard(id, 'INTERVIEW', '#10B981');
        this.updateStats();
    }

    markAsRejected(id) {
        const job = this.jobs.find(job => job.id === id);
        if (!job) return;

        job.type = 'declined';
        this.updateJobCard(id, 'REJECTED', '#EF4444');
        this.updateStats();
    }

    updateJobCard(id, status, color) {
        const card = document.getElementById(`jobCard${id}`);
        if (!card) return;

        const batch = card.querySelector('#batch');
        batch.textContent = status;
        batch.style.backgroundColor = color;
        batch.style.color = 'white';
    }

    deleteJob(id) {
        const card = document.getElementById(`jobCard${id}`);
        if (!card) return;

        card.remove();
        this.jobs = this.jobs.filter(job => job.id !== id);
        this.updateStats();
    }

    filterJobs(filter) {
        const cards = document.querySelectorAll('.main-jobs-card');

        cards.forEach((card) => {
            const id = parseInt(card.id.replace('jobCard', ''));
            const job = this.jobs.find(job => job.id === id);

            if (!job) {
                card.style.display = 'none';
                return;
            }

            if (filter === 'all') {
                card.style.display = 'flex';
            } else if (filter === 'accepted' && job.type === 'accepted') {
                card.style.display = 'flex';
            } else if (filter === 'declined' && job.type === 'declined') {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    updateStats() {
        const interviewed = this.jobs.filter(job => job.type === 'accepted').length;
        const rejected = this.jobs.filter(job => job.type === 'declined').length;

        document.getElementById('getJob')
            .querySelector('span').textContent = interviewed;

        document.getElementById('rejectJob')
            .querySelector('span').textContent = rejected;

        document.getElementById('totalJob')
            .textContent = `${this.jobs.length} Jobs`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JobTracker();
});