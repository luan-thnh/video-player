const VIDEO_DATA_KEY = 'dataVideo';

const inputSearch = document.querySelector('.sidebar__input-search');
const videoIframe = document.querySelector('.video__iframe');
const videoTitle = document.querySelector('.video__title');
const btnModules = document.querySelectorAll('.sidebar__btn-module');

// Handle get data video
const currentDataVideo = JSON.parse(localStorage.getItem(VIDEO_DATA_KEY));

if (currentDataVideo) {
  const { videoUrl: url, videoTitle: title, btnActive } = currentDataVideo;

  videoIframe.src = url;
  videoTitle.innerHTML = title;
  btnModules[btnActive].classList.add('active');
} else {
  videoIframe.src = 'https://ok.ru/videoembed/792842078886';
  videoTitle.innerHTML = 'Fairy Tail | Tập 1 - Yêu tinh cừu vĩ';
  btnModules[0].classList.add('active');
}

// Handle update video
btnModules.forEach((btnModule, index) => {
  btnModule.onclick = () => {
    const videoUrl = btnModule.getAttribute('data-video');

    videoIframe.src = videoUrl;
    videoTitle.innerHTML = `Fairy Tail | ${btnModule.innerText}`;

    btnModules.forEach((btnModule) => btnModule.classList.remove('active'));
    btnModule.classList.add('active');
    btnModule.scrollIntoView({ behavior: 'smooth' });

    const dataVideo = { videoUrl, videoTitle: videoTitle.innerHTML, btnActive: index };
    localStorage.setItem(VIDEO_DATA_KEY, JSON.stringify(dataVideo));
  };
});

// Handle scroll btn has class active when reload page
document.addEventListener('DOMContentLoaded', () => {
  const btnActive = document.querySelector('.sidebar__btn-module.active');
  if (btnActive) {
    btnActive.scrollIntoView({ behavior: 'smooth' });
  }
});

// Handle search title video
inputSearch.addEventListener('input', (e) => filterData(e.target.value));

const vietnameseChars = [
  'aàáảãạăằắẳẵặâầấẩẫậ',
  'eèéẻẽẹêềếểễệ',
  'iìíỉĩị',
  'oòóỏõọôồốổỗộơờớởỡợ',
  'uùúủũụưừứửữự',
  'yỳýỷỹỵ',
];

function removeVietnameseAccent(str) {
  for (let i = 0; i < vietnameseChars.length; i++) {
    const pattern = new RegExp(`[${vietnameseChars[i]}]`, 'gi');
    str = str.replace(pattern, i.toString());
  }
  return str;
}

function filterData(search) {
  search = removeVietnameseAccent(search).toLowerCase();
  btnModules.forEach((item) => {
    const itemText = removeVietnameseAccent(item.innerText).toLowerCase();
    if (itemText.includes(search)) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
}
