// Define a type for a testimonial object
type Testimonial = {
    name: string;
    photourl: string;
    text: string;
    job: string;
};

// Array of testimonials with proper TypeScript typing
const testimonials: Testimonial[] = [
    {
        name: "Haider Ali",
        photourl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        text: "Haider Ali Tipu delivers exceptional service with unmatched quality. Truly dedicated to customer satisfaction and authentic experiences.",
        job: "Customer Success Manager"
    },
    {
        name: "Sana Khan",
        photourl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        text: "Sana Khan brings creativity and passion to every project, ensuring excellence in design and innovation.",
        job: "Creative Designer"
    },
    {
        name: "Ahmed Raza",
        photourl: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?q=80&w=1826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        text: "Ahmed Raza's dedication and expertise in management make him a standout leader in his field.",
        job: "Project Manager"
    },
    {
        name: "Fatima Noor",
        photourl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        text: "Fatima Noor combines technical proficiency with a warm, collaborative approach that guarantees successful outcomes.",
        job: "Software Engineer"
    },
    {
        name: "Bilal Tariq",
        photourl: "https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        text: "Bilal Tariq's strategic insights and problem-solving skills drive efficiency and growth in every venture.",
        job: "Business Analyst"
    }
];

// Select elements from the DOM, ensuring proper type assertions
const img = document.querySelector<HTMLImageElement>("img");
const textElem = document.querySelector<HTMLElement>(".texts");
const nameElem = document.querySelector<HTMLElement>(".name");
const jobElem = document.querySelector<HTMLElement>(".job");

if (!img || !textElem || !nameElem || !jobElem) {
    throw new Error("Required elements not found in the DOM.");
}

// Initialize testimonial index
let index = 0;

// Function to update testimonials
function updateTestimonial(): void {
    const currentTestimonial = testimonials[index];

    // Update DOM elements
    img!.src = currentTestimonial.photourl;
    textElem!.innerText = currentTestimonial.text;
    nameElem!.innerText = currentTestimonial.name;
    jobElem!.innerText = currentTestimonial.job;

    // Update index for the next testimonial
    index = (index + 1) % testimonials.length;

    // Set timeout for the next update
    setTimeout(updateTestimonial, 10000);
}

// Start updating testimonials
updateTestimonial();
