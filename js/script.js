// 탭을 여는 함수
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // 모든 탭 콘텐츠를 숨기기
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // 모든 탭 링크의 활성 상태 제거
    tablinks = document.getElementsByClassName("tab-menu")[0].getElementsByTagName("a");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // 클릭한 탭과 해당하는 콘텐츠 표시
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}





const overlayImages = [
    'https://raw.githubusercontent.com/noita0130/Arknights-Images/main/graphics/elite_none.png',
    'https://raw.githubusercontent.com/noita0130/Arknights-Images/main/graphics/elite_none.png',
    'https://raw.githubusercontent.com/noita0130/Arknights-Images/main/graphics/elite_0.png',
    'https://raw.githubusercontent.com/noita0130/Arknights-Images/main/graphics/elite_1.png',
    'https://raw.githubusercontent.com/noita0130/Arknights-Images/main/graphics/elite_2.png'
];

// 로컬 스토리지에서 이미지 인덱스를 가져오거나, 없으면 빈 객체로 초기화
let imageIndices = JSON.parse(localStorage.getItem('imageIndices')) || {};

function overlayImage(img) {
    const overlay = img.nextElementSibling;
    const imgIdentifier = img.src;

    if (imageIndices[imgIdentifier] === undefined) {
        imageIndices[imgIdentifier] = 0;
    }
    let currentIndex = imageIndices[imgIdentifier];
    currentIndex = (currentIndex + 1) % overlayImages.length;

    overlay.src = overlayImages[currentIndex];
    imageIndices[imgIdentifier] = currentIndex;
    localStorage.setItem('imageIndices', JSON.stringify(imageIndices));
    

    if (currentIndex === 1) {
        img.style.filter = 'grayscale(100%)';
        img.style.opacity = '0.5';
    } else {
        img.style.filter = 'none';
        img.style.opacity = '1';
    }

    overlay.style.display = 'block';
}


// 모든 이미지의 인덱스를 지정된 값으로 설정하는 함수
function setImagesIndex(index) {
    const images = document.querySelectorAll('.image-list img:not(.overlay)');
    images.forEach(img => {
        const overlay = img.nextElementSibling;
        const imgIdentifier = img.src;

        imageIndices[imgIdentifier] = index;
        overlay.src = overlayImages[index];
        overlay.style.display = 'block';
        // 이미지 스타일 변경 로직 추가
        if (index === 1) {
            img.style.filter = 'grayscale(100%)';
            img.style.opacity = '0.5';
        }
        else {
            img.style.filter = 'none';
            img.style.opacity = '1';
        }
    });
    // 업데이트된 인덱스를 로컬 스토리지에 저장
    localStorage.setItem('imageIndices', JSON.stringify(imageIndices));
}



// 페이지 로드 시 저장된 오버레이 상태 복원
function restoreOverlayStates() {
    const images = document.querySelectorAll('.image-list img:not(.overlay)');
    images.forEach(img => {
        const overlay = img.nextElementSibling;
        const imgIdentifier = img.src;
        if (imageIndices[imgIdentifier] !== undefined) {
            let currentIndex = imageIndices[imgIdentifier];
            overlay.src = overlayImages[currentIndex];
            overlay.style.display = 'block';
            
            
            if (currentIndex === 1) {
                img.style.filter = 'grayscale(100%)';
                img.style.opacity = '0.5';
            } else {
                img.style.filter = 'none';
                img.style.opacity = '1';
            }
        }
    });
}

// 페이지 로드 시 오버레이 상태 복원 함수 호출
window.addEventListener('load', restoreOverlayStates);


function searchOperators() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();
    const operatorList = document.getElementById('operatorList');
    const operators = operatorList.getElementsByTagName('li');

    for (let i = 0; i < operators.length; i++) {
        const operatorName = operators[i].getAttribute('data-name').toLowerCase();
        if (operatorName.indexOf(filter) > -1) {
            operators[i].style.display = "";
        } else {
            operators[i].style.display = "none";
        }
    }
}



const phyButton = document.getElementById('physical');
const mgButton = document.getElementById('magical');
const groupAItems = document.querySelectorAll('.group-a');
const groupBItems = document.querySelectorAll('.group-b');
const debuffGroupAItems = document.querySelectorAll('.grid-debuff .group-a');
const debuffGroupBItems = document.querySelectorAll('.grid-debuff .group-b');

// 물리(phy) 버튼을 클릭했을 때
phyButton.addEventListener('click', () => {
    // 기존 group-a 처리
    groupAItems.forEach((item, index) => {
        item.style.display = 'block';
        item.style.borderBottom = index < groupAItems.length - 8 ? '1px solid #A4A4A4' : 'none';
    });
    groupBItems.forEach(item => {
        item.style.display = 'none';
        item.style.borderBottom = 'none';
    });
    
    // grid-debuff의 group-a 처리
    debuffGroupAItems.forEach((item, index) => {
        item.style.display = 'block';
        item.style.borderBottom = index < debuffGroupAItems.length - 1 ? '1px solid #A4A4A4' : 'none';
    });
    debuffGroupBItems.forEach(item => {
        item.style.display = 'none';
        item.style.borderBottom = 'none';
    });
});

// 마법(mg) 버튼을 클릭했을 때
mgButton.addEventListener('click', () => {
    // 기존 group-b 처리
    groupBItems.forEach((item, index) => {
        item.style.display = 'block';
        item.style.borderBottom = index < groupBItems.length - 8 ? '1px solid #A4A4A4' : 'none';
    });
    groupAItems.forEach(item => {
        item.style.display = 'none';
        item.style.borderBottom = 'none';
    });

    // grid-debuff의 group-b 처리
    debuffGroupBItems.forEach((item, index) => {
        item.style.display = 'block';
        item.style.borderBottom = index < debuffGroupBItems.length - 1 ? '1px solid #A4A4A4' : 'none';
    });
    debuffGroupAItems.forEach(item => {
        item.style.display = 'none';
        item.style.borderBottom = 'none';
    });
});

// 페이지 로드 시 phyButton 로직 실행
window.onload = () => {
    phyButton.click(); // 페이지 로드 시 phyButton 클릭 로직 실행
};

function updateRangeBackground(slider) {
    const min = slider.min;
    const max = slider.max;
    const value = slider.value;
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, rgb(45, 45, 45) 0%, rgb(45, 45, 45) ${percentage}%, #DEE2E6 ${percentage}%, #DEE2E6 100%)`;
}

function setupRangeInputs() {
    const rangeInputs = document.querySelectorAll('.range-input');
    rangeInputs.forEach(slider => {
        updateRangeBackground(slider);

        slider.oninput = function() {
            window.requestAnimationFrame(() => {
                updateRangeBackground(this);
            });

            // 연결된 number input 업데이트
            const numberInput = this.parentElement.querySelector('.number-input');
            if (numberInput) {
                window.requestAnimationFrame(() => {
                    numberInput.value = this.value;
                });
            }
        };
    });
}

function increment(button) {
    const input = button.parentElement.querySelector('.number-input');
    const rangeInput = button.parentElement.parentElement.parentElement.querySelector('.range-input');
    if (input.value < parseInt(input.max)) {
        input.value = parseInt(input.value) + 1;
        rangeInput.value = input.value;
        updateRangeBackground(rangeInput);
    }
}

function decrement(button) {
    const input = button.parentElement.querySelector('.number-input');
    const rangeInput = button.parentElement.parentElement.parentElement.querySelector('.range-input');
    if (input.value > parseInt(input.min)) {
        input.value = parseInt(input.value) - 1;
        rangeInput.value = input.value;
        updateRangeBackground(rangeInput);
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', setupRangeInputs);

document.getElementById('resetButton').addEventListener('click', function() {
    // 모든 number-input과 range-input을 선택
    const numberInputs = document.querySelectorAll('.number-input');
    const rangeInputs = document.querySelectorAll('.range-input');

    // number-input 초기화
    numberInputs.forEach(input => {
        input.value = 0;
        input.dispatchEvent(new Event('change')); // change 이벤트 발생
    });

    // range-input 초기화
    rangeInputs.forEach(input => {
        input.value = 0;
    });
});






