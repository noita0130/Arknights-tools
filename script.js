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


// 오버레이 상태를 저장하는 함수
function saveOverlayState(img, isDisplayed) {
    const operatorName = img.parentElement.dataset.name;
    localStorage.setItem(`overlay_${operatorName}`, isDisplayed);
}

// 오버레이 상태를 불러오는 함수
function loadOverlayState(img) {
    const operatorName = img.parentElement.dataset.name;
    return localStorage.getItem(`overlay_${operatorName}`);
}


// 오버레이 이미지 배열과 현재 인덱스를 저장할 객체 생성
const overlayImages = ['resources/graphics/elite_none.png',
                        'resources/graphics/elite_0.png',
                        'resources/graphics/elite_1.png',
                        'resources/graphics/elite_2.png'
                    ]; // 사용할 오버레이 이미지 경로들
let currentIndex = 0; // 현재 오버레이 이미지의 인덱스

function overlayImage(img) {
    const overlay = img.nextElementSibling;
    
    // 오버레이 이미지가 처음 실행될 때 설정
    if (!overlay.src) {
        overlay.src = overlayImages[currentIndex];
    }

    // 이미지를 클릭할 때마다 인덱스를 업데이트하여 다음 이미지를 표시
    currentIndex = (currentIndex + 1) % overlayImages.length; // 인덱스를 순환
    overlay.src = overlayImages[currentIndex];
    
    // 오버레이 이미지 표시/숨기기
    //const isDisplayed = overlay.style.display !== 'none';
    //overlay.style.display = isDisplayed ? 'none' : 'block';
    
    // 오버레이 상태 저장 (필요에 따라 수정 가능)
    saveOverlayState(img, !isDisplayed);
}

// 페이지 로드 시 오버레이 상태 복원
function restoreOverlayStates() {
    const operatorList = document.getElementById('operatorList');
    const operators = operatorList.getElementsByTagName('li');
    
    for (let operator of operators) {
        const img = operator.getElementsByTagName('img')[0];
        const overlay = operator.getElementsByTagName('img')[1];
        const state = loadOverlayState(img);
        
        /*if (state === 'true') {
            overlay.style.display = 'block';
        } else {
            overlay.style.display = 'none';
        }*/
    }
}
// 페이지 로드 시 실행
window.addEventListener('load', restoreOverlayStates);

function reset() {
    currentIndex = 0;
    /*const operatorList = document.getElementById('operatorList');
    const operators = operatorList.getElementsByTagName('li');
    
    for (let operator of operators) {
        const img = operator.getElementsByTagName('img')[0];
        const overlay = operator.getElementsByTagName('img')[1];
        
        overlay.style.display = 'none'; // 오버레이 숨기기
        saveOverlayState(img, false); // 오버레이 상태를 'false'로 저장
        
        operator.style.display = ""; // 모든 오퍼레이터 표시
    }*/
    
    // 검색 입력 필드 초기화
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