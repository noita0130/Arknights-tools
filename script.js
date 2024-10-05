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
    const atk = new Decimal(parseFloat(document.getElementById('atk').value));
    const atkBnsPer = new Decimal(parseFloat(document.getElementById('atkBonusPer').value));
    const atkBy = new Decimal(parseFloat(document.getElementById('atkBy').value));
    const dmgBy = new Decimal(parseFloat(document.getElementById('dmgBy').value));
    const opCrg = new Decimal(parseFloat(document.getElementById('opCourage').value));
    const crgBns = new Decimal(parseFloat(document.getElementById('courageBonus').value));
    const dmgWeak = new Decimal(parseFloat(document.getElementById('dmgWeak').value));
    const skilldmgBns = new Decimal(parseFloat(document.getElementById('skilldmgBonus').value));
    const dmgBonus = new Decimal(parseFloat(document.getElementById('dmgBonus').value));
    const phyDef = new Decimal(parseFloat(document.getElementById('physicalDef').value));
    const phyDefIg = new Decimal(parseFloat(document.getElementById('physicalDefIgnore').value));
    const phyDefIgPer = new Decimal(parseFloat(document.getElementById('physicalDefIgnorePer').value));
    const phyDefMns = new Decimal(parseFloat(document.getElementById('physicalDefMinus').value));
    const phyDefMnsPer1 = new Decimal(parseFloat(document.getElementById('physicalDefMinusPer1').value));
    const phyDefMnsPer2 = new Decimal(parseFloat(document.getElementById('physicalDefMinusPer2').value));
    const phyDefMnsPer3 = new Decimal(parseFloat(document.getElementById('physicalDefMinusPer3').value));
    const phyDmgBns = new Decimal(parseFloat(document.getElementById('physicalDmgBonus').value));
    const mgDef = new Decimal(parseFloat(document.getElementById('magicDef').value));
    const mgDefIg = new Decimal(parseFloat(document.getElementById('magicDefIgnore').value));
    const mgDefMns = new Decimal(parseFloat(document.getElementById('magicDefMinus').value));
    const mgDefMnsPer1 = new Decimal(parseFloat(document.getElementById('magicDefMinusPer1').value));
    const mgDefMnsPer2 = new Decimal(parseFloat(document.getElementById('magicDefMinusPer2').value));
    const mgDefMnsPer3 = new Decimal(parseFloat(document.getElementById('magicDefMinusPer3').value));
    const mgDmgWeak = new Decimal(parseFloat(document.getElementById('magicDmgWeak').value));
    const mgDmgBns = new Decimal(parseFloat(document.getElementById('magicDmgBonus').value));
    

    const defType = document.querySelector('input[name="deftype"]:checked')?.id;

    // 최종공격력 계산
let finalAtk = Decimal.max(0,
    atk.mul(Decimal.add(1, atkBnsPer.mul(0.01)))
      .add(opCrg.mul(crgBns.mul(0.01)))
      .mul(Math.max(1,atkBy.mul(0.01)))
      .mul(Math.max(1,dmgBy.mul(0.01)))
  );
  
  // 최종 방어력 계산
  let finalDef = Decimal.max(0,
    phyDef.minus(phyDefMns)
      .mul(Decimal.sub(1, phyDefMnsPer1.mul(0.01)))
      .mul(Decimal.sub(1, phyDefMnsPer2.mul(0.01)))
      .mul(Decimal.sub(1, phyDefMnsPer3.mul(0.01)))
      .mul(Decimal.sub(1, phyDefIgPer.mul(0.01)))
      .minus(phyDefIg)
  );
  
  // 최종 마법 저항 계산
  let finalMgDef = Decimal.max(0,
    mgDef.minus(mgDefMns)
      .mul(Decimal.sub(1, mgDefMnsPer1.mul(0.01)))
      .mul(Decimal.sub(1, mgDefMnsPer2.mul(0.01)))
      .mul(Decimal.sub(1, mgDefMnsPer3.mul(0.01)))
      .minus(mgDefIg)
  );

  // 최종 데미지 계산
  let damage = finalAtk;
  
  if (defType === 'physic') {
    damage = Decimal.max(0, finalAtk.minus(finalDef));
    if (damage.greaterThanOrEqualTo(finalAtk.mul(0.05))) {
      finalDamage = Decimal.max(0, 
        finalAtk.minus(finalDef)
          .mul(Decimal.add(1, skilldmgBns.mul(0.01)))
          .mul(Decimal.add(1, dmgWeak.mul(0.01)))
          .mul(Decimal.add(1, dmgBonus.mul(0.01)))
          .mul(Decimal.add(1, phyDmgBns.mul(0.01)))
      );
    } else {
      finalDamage = Decimal.max(0, 
        finalAtk.mul(0.05)
          .mul(Decimal.add(1, dmgWeak.mul(0.01)))
          .mul(Decimal.add(1, dmgBonus.mul(0.01)))
      );
    }
  
  } else if (defType === 'magic') {
    damage = Decimal.max(0, finalAtk.mul(Decimal.sub(1, finalMgDef.mul(0.01))));  

    //씨발왜안됨
    if (damage.greaterThanOrEqualTo(finalAtk.mul(0.05))) {
      finalDamage = Decimal.max(0, 
        finalAtk
          .mul(Decimal.sub(1, finalMgDef.mul(0.01)))
          .mul(Decimal.add(1, skilldmgBns.mul(0.01)))
          .mul(Decimal.add(1, dmgWeak.mul(0.01)))
          .mul(Decimal.add(1, dmgBonus.mul(0.01)))
          .mul(Decimal.add(1, mgDmgBns.mul(0.01)))
          .mul(Decimal.add(1, mgDmgWeak.mul(0.01)))
      );
    } else {
      finalDamage = Decimal.max(0, 
        finalAtk.mul(0.05)
          .mul(Decimal.add(1, dmgWeak.mul(0.01)))
          .mul(Decimal.add(1, dmgBonus.mul(0.01)))
          .mul(Decimal.add(1, mgDmgBns.mul(0.01)))
          .mul(Decimal.add(1, mgDmgWeak.mul(0.01)))
      );
    }
  }

    const label = document.querySelector('.result-group .result');
    if (label) {
        label.innerHTML = `결과값 : ${finalDamage.toFixed(2)}`;
    } else {
        console.error('결과를 표시할 요소를 찾을 수 없습니다.');
    }
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

        // 모든 입력 요소에 이벤트 리스너 추가
        if (numberInput) {
            numberInput.addEventListener('input', debouncedDmgcal);
        }
        if (rangeInput) {
            rangeInput.addEventListener('input', debouncedDmgcal);
        }
    });
    
    // 라디오 버튼에 이벤트 리스너 추가
    document.querySelectorAll('input[name="deftype"]').forEach(radio => {
        radio.addEventListener('change', debouncedDmgcal);
    });

    // 모든 입력 요소에 대해 이벤트 리스너 추가
    document.querySelectorAll('input[type="number"], input[type="range"]').forEach(input => {
        input.addEventListener('input', debouncedDmgcal);
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

document.addEventListener('DOMContentLoaded', function() {
    const initialCheckedRadio = document.querySelector('input[name="deftype"]:checked');
    if (initialCheckedRadio && initialCheckedRadio.value === 'A') {
        gridContainer.classList.add('hide-column-3');
        column3Items.forEach(item => item.classList.add('hidden'));
    }
});

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
