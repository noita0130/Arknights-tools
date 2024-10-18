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

window.onload = function() {
    var button = document.getElementById('physical');
        if (button) {
            button.click(); // 버튼을 자동으로 클릭
        }
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
        item.style.borderBottom = index < groupAItems.length - 8 ? '1px solid #ccc' : 'none';
    });
    groupBItems.forEach(item => {
        item.style.display = 'none';
        item.style.borderBottom = 'none';
    });
    
    // grid-debuff의 group-a 처리
    debuffGroupAItems.forEach((item, index) => {
        item.style.display = 'block';
        item.style.borderBottom = index < debuffGroupAItems.length - 1 ? '1px solid #ccc' : 'none';
    });
    debuffGroupBItems.forEach(item => {
        item.style.display = 'none';
        item.style.borderBottom = 'none';
    });
    debouncedCalculate();
});

// 마법(mg) 버튼을 클릭했을 때
mgButton.addEventListener('click', () => {
    // 기존 group-b 처리
    groupBItems.forEach((item, index) => {
        item.style.display = 'block';
        item.style.borderBottom = index < groupBItems.length - 8 ? '1px solid #ccc' : 'none';
    });
    groupAItems.forEach(item => {
        item.style.display = 'none';
        item.style.borderBottom = 'none';
    });

    // grid-debuff의 group-b 처리
    debuffGroupBItems.forEach((item, index) => {
        item.style.display = 'block';
        item.style.borderBottom = index < debuffGroupBItems.length - 1 ? '1px solid #ccc' : 'none';
    });
    debuffGroupAItems.forEach(item => {
        item.style.display = 'none';
        item.style.borderBottom = 'none';
    });
    debouncedCalculate();
});


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

function MinMax(min, max, input) {
    return Math.min(Math.max(min, input), max);
}


// 계산 함수 (예시)
function calculate() {
    const atkPerBnsAlly = new Decimal(parseFloat(document.getElementById('atkPerBnsAlly').value));
    const atkCrg = new Decimal(parseFloat(document.getElementById('atkCrg').value));
    const atkCrgBns = new Decimal(parseFloat(document.getElementById('atkCrgBns').value));
    const couragePer = new Decimal(parseFloat(document.getElementById('couragePer').value));

    const atkPerMnsAlly = new Decimal(parseFloat(document.getElementById('atkPerMnsAlly').value));

    const baseAtk = new Decimal(parseFloat(document.getElementById('baseAtk').value));
    const atkPerBns = new Decimal(parseFloat(document.getElementById('atkPerBns').value));
    const atkPerBy = new Decimal(parseFloat(document.getElementById('atkPerBy').value));
    const skillDmg = new Decimal(parseFloat(document.getElementById('skillDmg').value));

    const phyDef = new Decimal(parseFloat(document.getElementById('phyDef').value));
    const phyDefPerBns = new Decimal(parseFloat(document.getElementById('phyDefPerBns').value));
    const phyDefBns = new Decimal(parseFloat(document.getElementById('phyDefBns').value));
    const phyDmgRdc = new Decimal(parseFloat(document.getElementById('phyDmgRdc').value));

    const phyDefRdcPer1 = new Decimal(parseFloat(document.getElementById('phyDefRdcPer1').value));
    const phyDefRdcPer2 = new Decimal(parseFloat(document.getElementById('phyDefRdcPer2').value));
    const phyDefRdcPer3 = new Decimal(parseFloat(document.getElementById('phyDefRdcPer3').value));
    const phyDefRdc = new Decimal(parseFloat(document.getElementById('phyDefRdc').value));
    const phyDefIgPer = new Decimal(parseFloat(document.getElementById('phyDefIgPer').value));
    const phyDefIg = new Decimal(parseFloat(document.getElementById('phyDefIg').value));
    const phyDmgInc = new Decimal(parseFloat(document.getElementById('phyDmgInc').value));

    const mgDef = new Decimal(parseFloat(document.getElementById('mgDef').value));
    const mgDefBns = new Decimal(parseFloat(document.getElementById('mgDefBns').value));
    const mgDmgRdc = new Decimal(parseFloat(document.getElementById('mgDmgRdc').value));

    const mgDefRdcPer1 = new Decimal(parseFloat(document.getElementById('mgDefRdcPer1').value));
    const mgDefRdcPer2 = new Decimal(parseFloat(document.getElementById('mgDefRdcPer2').value));
    const mgDefRdcPer3 = new Decimal(parseFloat(document.getElementById('mgDefRdcPer3').value));
    const mgDefIg = new Decimal(parseFloat(document.getElementById('mgDefIg').value));
    const mgDmgWeak = new Decimal(parseFloat(document.getElementById('mgDmgWeak').value));
    const mgDmgInc = new Decimal(parseFloat(document.getElementById('mgDmgInc').value));
    const mgDefRdc = new Decimal(parseFloat(document.getElementById('mgDefRdc').value));

    const dmgWeak = new Decimal(parseFloat(document.getElementById('dmgWeak').value));

    

    const defType = document.querySelector('input[name="defDisplay"]:checked')?.id;

    
// 최종공격력 계산
    let courageAtk = atkCrg.times(new Decimal(1).plus(atkCrgBns.times(0.01)))
                        .times(couragePer.times(0.01)); //격려

    let semiFinalAtk = baseAtk.times(new Decimal(1).plus(atkPerBns.plus(atkPerBnsAlly).times(0.01)))
                            .plus(courageAtk); //공격력

    let finalAtk = semiFinalAtk.times(atkPerBy.times(0.01))
                            .times(skillDmg.times(0.01)); // 타점

    let enemyPhyDef = new Decimal(Math.max(0, phyDef.plus(phyDefBns)
    .times(new Decimal(1).plus(phyDefPerBns.times(0.01)))
    .toNumber()));
    
    let finalPhyDef = new Decimal(Math.max(0, enemyPhyDef.times(new Decimal(1).minus(phyDefRdcPer1.times(0.01)))
                                .times(new Decimal(1).minus(phyDefRdcPer2.times(0.01)))
                                .times(new Decimal(1).minus(phyDefRdcPer3.times(0.01)))
                                .minus(phyDefRdc)
                                .toNumber()));

    let defAfterIgnore = new Decimal(Math.max(0, finalPhyDef.minus(phyDefIg)
                                            .times(new Decimal(1).minus(phyDefIgPer.times(0.01)))
                                            .toNumber()));

    let finalPhyDmg = Math.max(0, finalAtk.minus(defAfterIgnore)
                                        .times(new Decimal(1).plus(dmgWeak.times(0.01)))
                                        .times(new Decimal(1).plus(phyDmgInc.times(0.01)))
                                        .times(new Decimal(1).minus(phyDmgRdc.times(0.01))));

    let enemyMgDef = new Decimal(minmax(mgDef.plus(mgDefBns).toNumber()));

    let finalMgDef = new Decimal(minmax(enemyMgDef.times(new Decimal(1).minus(mgDefRdcPer1.times(0.01)))
                                                .times(new Decimal(1).minus(mgDefRdcPer2.times(0.01)))
                                                .times(new Decimal(1).minus(mgDefRdcPer3.times(0.01)))
                                                .minus(mgDefRdc)
                                                .toNumber()));

    let finalMgDmg = finalAtk.times(new Decimal(1).minus(new Decimal(minmax(finalMgDef.minus(phyDefIg)
                                                                                .times(new Decimal(1).minus(phyDefIgPer.times(0.01)))
                                                                                .toNumber()))
                                                        .times(0.01)))
                            .times(new Decimal(1).plus(dmgWeak.times(0.01)))
                            .times(new Decimal(1).plus(mgDmgWeak.times(0.01)))
                            .times(new Decimal(1).plus(mgDmgInc.times(0.01)))
                            .times(new Decimal(1).minus(mgDmgRdc.times(0.01)));

    if (defType == 'physical') {
        // 물리 데미지 최소값 계산
        minPhyDmg = semiFinalAtk.times(0.05);
        
        // 정밀도를 위해 임시 변수에 저장하고 비교
        const finalPhyDmgTemp = new Decimal(finalPhyDmg).toDecimalPlaces(10);
        const minPhyDmgTemp = new Decimal(minPhyDmg).toDecimalPlaces(10);
        
        // 숫자 비교를 위해 Decimal의 비교 메서드 사용
        if (finalPhyDmgTemp.lessThanOrEqualTo(minPhyDmgTemp) && !baseAtk.isZero()) {
            document.querySelector('.result-number').textContent = (minPhyDmg.toFixed(2) + '(최솟값)');
        } else {
            document.querySelector('.result-number').textContent = finalPhyDmg.toFixed(2);
        }
    } else if (defType == 'magical') {
        // 마법 데미지 최소값 계산
        minMgDmg = semiFinalAtk.times(0.05);
        
        // 정밀도를 위해 임시 변수에 저장하고 비교
        const finalMgDmgTemp = new Decimal(finalMgDmg).toDecimalPlaces(10);
        const minMgDmgTemp = new Decimal(minMgDmg).toDecimalPlaces(10);
        
        // 숫자 비교를 위해 Decimal의 비교 메서드 사용
        if (finalMgDmgTemp.lessThanOrEqualTo(minMgDmgTemp) && !baseAtk.isZero()) {
            document.querySelector('.result-number').textContent = (minMgDmg.toFixed(2) + '(최솟값)');
        } else {
            document.querySelector('.result-number').textContent = finalMgDmg.toFixed(2);
        }
    }
}

function minmax(input) {
    let mm = Math.min(100, Math.max(0, input));
    return mm;
}


// 디바운스 함수 정의
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// range 배경 업데이트 함수
function updateRangeBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, rgb(45, 45, 45) 0%, rgb(45, 45, 45) ${percentage}%, #FFFFFF ${percentage}%, #FFFFFF 100%)`;
}

function increment(button) {
    const input = button.parentElement.querySelector('.number-input');
    const rangeInput = button.parentElement.parentElement.parentElement.querySelector('.range-input');
    const max = parseFloat(input.max);
    let value = parseFloat(input.value);

    if (value < max) {
        value = Math.min(value + 1, max);
        input.value = value.toString();
        rangeInput.value = value.toString();
        updateRangeBackground(rangeInput);
        debouncedCalculate();
    }
}

// 감소 함수
function decrement(button) {
    const input = button.parentElement.querySelector('.number-input');
    const rangeInput = button.parentElement.parentElement.parentElement.querySelector('.range-input');
    const min = parseFloat(input.min);
    let value = parseFloat(input.value);

    if (value > min) {
        value = Math.max(value - 1, min);
        input.value = value.toString();
        rangeInput.value = value.toString();
        updateRangeBackground(rangeInput);
        debouncedCalculate();
    }
}

function syncInputsAndCalculate() {
    const tab2 = document.getElementById('tab2');
    const inputs = tab2.querySelectorAll('input[type="number"], input[type="range"]');

    inputs.forEach(input => {
        const isRange = input.type === 'range';
        const pair = isRange ? 
            input.closest('.inputStat').querySelector('input[type="number"]') : 
            input.closest('.inputStat').querySelector('input[type="range"]');

        input.addEventListener('input', function() {
            let value = this.value;
            const min = parseFloat(this.min) || 0;
            const max = parseFloat(this.max);

            // 숫자 입력의 경우 범위 제한 및 빈 값 처리
            if (!isRange) {
                if (value === '') {
                    value = min.toString();
                } else {
                    value = Math.max(min, Math.min(max, parseFloat(value) || min)).toString();
                }
                this.value = value;
            }

            pair.value = value;
            updateRangeBackground(isRange ? this : pair);
            debouncedCalculate();
        });

        // number 입력에 대한 추가 이벤트 리스너
        if (!isRange) {
            input.addEventListener('change', function() {
                let value = this.value;
                const min = parseFloat(this.min) || 0;
                const max = parseFloat(this.max);
                
                if (value === '') {
                    value = min.toString();
                } else {
                    value = Math.max(min, Math.min(max, parseFloat(value) || min)).toString();
                }
                
                this.value = value;
                pair.value = value;
                updateRangeBackground(pair);
                debouncedCalculate();
            });

            // blur 이벤트 리스너 추가
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    const min = parseFloat(this.min) || 0;
                    this.value = min.toString();
                    pair.value = this.value;
                    updateRangeBackground(pair);
                    debouncedCalculate();
                }
            });
        }
    });

    // 증가/감소 버튼에 이벤트 리스너 추가
    const incrementButtons = tab2.querySelectorAll('button[onclick^="increment"]');
    const decrementButtons = tab2.querySelectorAll('button[onclick^="decrement"]');

    incrementButtons.forEach(button => {
        // 기존 onclick 속성 제거
        button.removeAttribute('onclick');
        // 새 이벤트 리스너 추가
        button.addEventListener('click', function() {
            increment(this);
        });
    });

    decrementButtons.forEach(button => {
        // 기존 onclick 속성 제거
        button.removeAttribute('onclick');
        // 새 이벤트 리스너 추가
        button.addEventListener('click', function() {
            decrement(this);
        });
    });
}


// 디바운스된 계산 함수
const debouncedCalculate = debounce(calculate, 300);

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    syncInputsAndCalculate();
    
    // 초기 range 배경 설정
    const ranges = document.querySelectorAll('input[type="range"]');
    ranges.forEach(updateRangeBackground);
});

function resetInputs() {
    const tab2 = document.getElementById('tab2');
    const numberInputs = tab2.querySelectorAll('.number-input');
    const rangeInputs = tab2.querySelectorAll('.range-input');

    // number-input과 range-input 초기화
    numberInputs.forEach((input, index) => {
        input.value = input.min || '0';
        const rangeInput = rangeInputs[index];
        if (rangeInput) {
            rangeInput.value = input.value;
            updateRangeBackground(rangeInput);
        }
    });

    // 계산 함수 호출
    debouncedCalculate();
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    syncInputsAndCalculate();
    
    // 초기 range 배경 설정
    const ranges = document.querySelectorAll('input[type="range"]');
    ranges.forEach(updateRangeBackground);

    // 리셋 버튼에 이벤트 리스너 추가
    const resetButton = document.querySelector('.resetGroup input[name="resetInput"]');
    if (resetButton) {
        resetButton.addEventListener('click', resetInputs);
    } else {
        console.error('Reset button not found');
    }
});






