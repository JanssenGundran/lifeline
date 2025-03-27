const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel');
const authMiddleware = require('../middleware/authMiddleware'); 

// Get all jobs (PUBLIC)
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new job (ADMIN ONLY)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, maxHires } = req.body;
        if (!maxHires) return res.status(400).json({ message: "maxHires is required" });

        const newJob = new Job({
            title,
            description,
            maxHires,
            waitingList: [],
            hiredList: []
        });

        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Apply for a job (PUBLIC)
router.post('/:id/apply', async (req, res) => {
    try {
        const { name, email } = req.body;
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.hiredList.length >= job.maxHires) {
            return res.status(400).json({ message: 'Job already filled' });
        }

        
        job.waitingList.push({ name, email });
        await job.save();

<<<<<<< HEAD
        
=======
>>>>>>> 02e1b30 (Updated files)
        res.json({ message: 'Application received!', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
// Hire
router.post('/:id/hire', async (req, res) => {
=======
// Hire an applicant (ADMIN ONLY)
router.post('/:id/hire', authMiddleware, async (req, res) => {
>>>>>>> 02e1b30 (Updated files)
    try {
        const { name, email } = req.body;
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

<<<<<<< HEAD
        
=======
>>>>>>> 02e1b30 (Updated files)
        const applicantIndex = job.waitingList.findIndex(app => app.name === name && app.email === email);
        if (applicantIndex === -1) {
            return res.status(400).json({ message: 'Applicant not found in waiting list' });
        }

<<<<<<< HEAD
       
=======
>>>>>>> 02e1b30 (Updated files)
        const hiredApplicant = {
            name: job.waitingList[applicantIndex].name,
            email: job.waitingList[applicantIndex].email,
            hiredAt: new Date()
        };

        job.hiredList.push(hiredApplicant);
<<<<<<< HEAD

       
        job.waitingList.splice(applicantIndex, 1);

        
        await job.save();

       
=======
        job.waitingList.splice(applicantIndex, 1);
        await job.save();

        // Delete the job if hiring is complete
>>>>>>> 02e1b30 (Updated files)
        if (job.hiredList.length >= job.maxHires) {
            await Job.findByIdAndDelete(req.params.id);
            return res.json({ message: 'Job filled and deleted', job });
        }

<<<<<<< HEAD
    
=======
>>>>>>> 02e1b30 (Updated files)
        res.json({ message: 'Applicant hired!', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a job (ADMIN ONLY)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get job by ID (PUBLIC)
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a job (ADMIN ONLY)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, description, maxHires } = req.body;
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            { title, description, maxHires },
            { new: true, runValidators: true }
        );

        if (!updatedJob) return res.status(404).json({ message: "Job not found" });
        res.json({ message: "Job updated", updatedJob });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
