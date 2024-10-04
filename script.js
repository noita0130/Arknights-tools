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
    'https://raw.githubusercontent.com/k132h243/Arknights-Images/main/graphics/elite_none.png',
    'https://raw.githubusercontent.com/k132h243/Arknights-Images/main/graphics/elite_none.png',
    'https://raw.githubusercontent.com/k132h243/Arknights-Images/main/graphics/elite_0.png',
    'https://raw.githubusercontent.com/k132h243/Arknights-Images/main/graphics/elite_1.png',
    'https://raw.githubusercontent.com/k132h243/Arknights-Images/main/graphics/elite_2.png'
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


let dmgcalTimeout;

function debounce(func, wait) {
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(dmgcalTimeout);
            func(...args);
        };
        clearTimeout(dmgcalTimeout);
        dmgcalTimeout = setTimeout(later, wait);
    };
}

function calculateDamage() {
    const attack = parseInt(document.getElementById('attack').value);
    const defense = parseInt(document.getElementById('defense').value);
    const defType = document.querySelector('input[name="deftype"]:checked')?.id;
    let damage = 0;

    if (defType === 'physic') {
        damage = Math.max(0, attack - defense);
    } else if (defType === 'magic') {
        damage = Math.max(0, attack - Math.floor(defense * 0.7));
    }
    console.log(`계산된 데미지: ${damage}`);
}

const debouncedDmgcal = debounce(calculateDamage, 100);

function syncInputs(numberInput, rangeInput) {
    numberInput.addEventListener('input', function() {
        rangeInput.value = this.value;
        debouncedDmgcal();
    });

    rangeInput.addEventListener('input', function() {
        numberInput.value = this.value;
        debouncedDmgcal();
    });
}

function increment(btn) {
    const input = btn.previousElementSibling;
    input.stepUp();
    input.dispatchEvent(new Event('input'));
}

function decrement(btn) {
    const input = btn.nextElementSibling;
    input.stepDown();
    input.dispatchEvent(new Event('input'));
}

// 페이지 로드 시 모든 입력 그룹에 대해 동기화 설정
window.addEventListener('load', function() {
    const inputGroups = document.querySelectorAll('.input-group, .input-grid > div');
    inputGroups.forEach(group => {
        const numberInput = group.querySelector('.number-input');
        const rangeInput = group.querySelector('.range-input');
        if (numberInput && rangeInput) {
            syncInputs(numberInput, rangeInput);
        }
    });
    
    // 라디오 버튼에 이벤트 리스너 추가
    document.querySelectorAll('input[name="deftype"]').forEach(radio => {
        radio.addEventListener('change', debouncedDmgcal);
    });
    
    // 초기 계산 수행
    calculateDamage();
});

const radioButtons = document.querySelectorAll('input[name="deftype"]');
const gridContainer = document.querySelector('.input-grid');
const column2Items = document.querySelectorAll('.column-2');
const column3Items = document.querySelectorAll('.column-3');

radioButtons.forEach(radio => {
    radio.addEventListener('change', (event) => {
        if (event.target.value === 'A') {
            //column3을 가리고 column2를 보여주기
            gridContainer.classList.add('hide-column-3');
            column3Items.forEach(item => item.classList.add('hidden'));
            gridContainer.classList.remove('hide-column-2');
            column2Items.forEach(item => item.classList.remove('hidden'));
            

        } else {
            //column2를 가리고 column3를 보여주기
            gridContainer.classList.add('hide-column-2');
            column2Items.forEach(item => item.classList.add('hidden'));
            gridContainer.classList.remove('hide-column-3');
            column3Items.forEach(item => item.classList.remove('hidden'));
        }
    });
});
