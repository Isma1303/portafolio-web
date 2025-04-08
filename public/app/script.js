function redirectig() {
    window.location.href = 'https://www.google.com';
}

document.getElementById('linkedin').addEventListener('click', function() {
    window.location.href = 'https://www.linkedin.com';
});

document.getElementById('github').addEventListener('click', function() {
    window.location.href = 'https://www.github.com';
});

document.getElementById('twitter').addEventListener('click', function() {
    window.location.href = 'https://www.twitter.com';
});

document.getElementById("instagram").addEventListener('click', functionig);

document.addEventListener('DOMContentLoaded', () => {
    // Typing animation
    const typed = new Typed('.typing-text span', {
        strings: ['Developer', 'Student', 'Gamer'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                subject: contactForm.querySelector('input[placeholder="Subject"]').value,
                message: contactForm.querySelector('textarea').value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Error sending message. Please try again.', 'error');
            }
        });
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Add styles for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            color: white;
            font-size: 1.6rem;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        }

        .notification.success {
            background-color: #4CAF50;
        }

        .notification.error {
            background-color: #f44336;
        }

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
    `;
    document.head.appendChild(style);
});