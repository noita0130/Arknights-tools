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
    'resources/graphics/elite_none.png',
    'resources/graphics/28px.png',
    'resources/graphics/elite_0.png',
    'resources/graphics/elite_1.png',
    'resources/graphics/elite_2.png'
];

// 로컬 스토리지에서 이미지 인덱스를 가져오거나, 없으면 빈 객체로 초기화
let imageIndices = JSON.parse(localStorage.getItem('imageIndices')) || {};

function overlayImage(img) {
    const overlay = img.nextElementSibling; //함수를 실행한 객체의 다음요소에 적용
    const imgIdentifier = img.src; // 이미지의 src를 식별자로 사용

    // 이 이미지에 대한 인덱스가 없으면 초기화
    if (imageIndices[imgIdentifier] === undefined) {
        imageIndices[imgIdentifier] = 0;
    }

    // 현재 이미지의 인덱스 가져오기
    let currentIndex = imageIndices[imgIdentifier];

    // 이미지를 클릭할 때마다 인덱스를 업데이트하여 다음 이미지를 표시
    currentIndex = (currentIndex + 1) % overlayImages.length; // 인덱스를 순환
    overlay.src = overlayImages[currentIndex];

    // 업데이트된 인덱스 저장
    imageIndices[imgIdentifier] = currentIndex;

    // 로컬 스토리지에 업데이트된 인덱스 저장
    localStorage.setItem('imageIndices', JSON.stringify(imageIndices));

    // 오버레이 이미지 표시
    overlay.style.display = 'block';
}

// 페이지 로드 시 저장된 오버레이 상태 복원
function restoreOverlayStates() {
    const images = document.querySelectorAll('.image-list img:not(.overlay)');
    images.forEach(img => {
        const overlay = img.nextElementSibling;
        const imgIdentifier = img.src;
        if (imageIndices[imgIdentifier] !== undefined) {
            overlay.src = overlayImages[imageIndices[imgIdentifier]];
            overlay.style.display = 'block';
        }
    });
}

// 페이지 로드 시 오버레이 상태 복원 함수 호출
window.addEventListener('load', restoreOverlayStates);


function reset() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';






    
}
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