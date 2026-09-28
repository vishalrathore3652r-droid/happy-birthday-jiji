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
    
    // 1. Trigger Pop Effect
    giftBox.classList.add('pop');
    
    // 2. Play Audio Track
    bgMusic.play().catch(e => console.log('Audio playback prevented:', e));

    // 3. Launch Floating Photos across full screen
    setTimeout(() => {
        launchFloatingPhotos();
    }, 300);

    // 4. Trigger Flower Burst after photos settle (~5.5 seconds)
    setTimeout(() => {
        triggerFlowerBurst();
    }, 5800);
}

function launchFloatingPhotos() {
    const overlay = document.getElementById('photoOverlay');
    
    photos.forEach((src, index) => {
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'floating-photo';
            
            // Random horizontal positioning & subtle rotation
            const randomX = Math.random() * 75 + 5; // 5% to 80% left
            const randomRotation = (Math.random() - 0.5) * 40; // -20deg to 20deg
            
            img.style.left = `${randomX}vw`;
            img.style.transform = `rotate(${randomRotation}deg)`;
            
            overlay.appendChild(img);

            // Clean up DOM after animation completes
            setTimeout(() => {
                img.remove();
            }, 6000);
        }, index * 600); // Stagger each photo entrance
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
            const randomSize = Math.random() * 20 + 24; // 24px - 44px
            
            flower.style.left = `${randomX}vw`;
            flower.style.fontSize = `${randomSize}px`;
            
            overlay.appendChild(flower);

            setTimeout(() => {
                flower.remove();
            }, 4000);
        }, i * 60); // Rapid succession burst
    }
}
