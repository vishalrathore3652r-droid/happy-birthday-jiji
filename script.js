const photos = [
    '20240421_135224.jpg',
    'IMG_20240127_194833.jpg',
    '20220127_200211.jpg',
    'be4857d7-983b-462c-b080-8f6e3fe6725a.jfif',
    'c2fe8fc2-3a63-40d8-90d2-230389acf219.jfif',
    '20241013_113712.jpg',
    '20241024_164220.jpg',
    '20241231_204247.jpg'
];

const flowerEmojis = ['🌸', '🌺', '🌹', '🌻', '🌷', '💐', '🌼'];

function openGift() {
    const giftBox = document.getElementById('giftBox');
    const bgMusic = document.getElementById('bgMusic');
    
    // 1. Trigger Gift Pop Effect & Play Song
    giftBox.classList.add('pop');
    bgMusic.play().catch(e => console.log('Audio playback prevented:', e));

    // 2. Launch Photos sequence
    setTimeout(() => {
        launchPhotoSequence();
    }, 300);

    // 3. Trigger Flower Burst right when the photos settle/circle (~7.5 seconds)
    setTimeout(() => {
        triggerFlowerBurst();
    }, 7500);
}

function launchPhotoSequence() {
    const overlay = document.getElementById('photoOverlay');
    
    photos.forEach((src, index) => {
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'floating-photo float-up';
            
            // Random horizontal start position
            const randomX = Math.random() * 60 + 15; 
            img.style.left = `${randomX}vw`;
            
            overlay.appendChild(img);

            // PHASE 2: After 5 seconds, make them drop down smoothly
            setTimeout(() => {
                img.classList.remove('float-up');
                img.classList.add('drop-down');
            }, 5000);

            // PHASE 3: After dropping down (at 7 seconds), select a few "good ones" to start circling
            setTimeout(() => {
                img.classList.remove('drop-down');
                
                // Pick specific standout photos to circle (indexes 0, 2, 5, 7)
                if (index === 0 || index === 2 || index === 5 || index === 7) {
                    img.classList.add('circling');
                    img.style.animationDelay = `${index * -2}s`; 
                } else {
                    // Softly fade out the remaining photos so the screen isn't cluttered
                    img.style.transition = 'opacity 1s ease';
                    img.style.opacity = '0.3';
                }
            }, 7000);

        }, index * 400); // Stagger each photo's entrance
    });
}

function triggerFlowerBurst() {
    const overlay = document.getElementById('flowerOverlay');
    const totalFlowers = 70;

    for (let i = 0; i < totalFlowers; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.innerText = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            
            const randomX = Math.random() * 100;
            const randomSize = Math.random() * 20 + 24; 
            
            flower.style.left = `${randomX}vw`;
            flower.style.fontSize = `${randomSize}px`;
            
            overlay.appendChild(flower);

            setTimeout(() => {
                flower.remove();
            }, 4000);
        }, i * 60);
    }
}
