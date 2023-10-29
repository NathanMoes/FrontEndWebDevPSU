const moreColors = [
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
  getRandomColor(),
];

const backgroundColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
  'rgba(83, 102, 255, 0.8)',
  'rgba(40, 159, 64, 0.8)',
  'rgba(210, 199, 199, 0.8)',
  'rgba(78, 52, 199, 0.8)',
  ...moreColors,
];

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  let a = Math.random();
  if (a > 0.8) {
    // make sure the alpha is dimmed
    a -= 0.5;
  }
  const color = `rgba(${r}, ${g}, ${b}, ${a})`;
  return color;
}

const borderColors = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(159, 159, 159, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(40, 159, 64, 1)',
  'rgba(210, 199, 199, 1)',
  'rgba(78, 52, 199, 1)',
  ...moreColors,
];

function capitalizeHouseNames(str) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function standardizeHouseName(name) {
  if (!name) return name;

  name = name.trim().toLowerCase();

  if (name.includes('stark')) {
    return 'House Stark';
  } else if (name.includes('lannister') || name.includes('lanister')) {
    return 'House Lannister';
  } else if (
    name.includes('targaryen') ||
    name.includes('targaryn') ||
    name.includes('targaryan')
  ) {
    return 'House Targaryen';
  } else if (name.includes('baratheon')) {
    return 'House Baratheon';
  } else if (name.includes('greyjoy')) {
    return 'House Greyjoy';
  } else if (name.includes('martell')) {
    return 'House Martell';
  } else if (name.includes('arryn')) {
    return 'House Arryn';
  } else if (name.includes('frey')) {
    return 'House Frey';
  } else if (name.includes('tyrell')) {
    return 'House Tyrell';
  } else if (name.includes('tully')) {
    return 'House Tully';
  } else if (
    name.includes('none') ||
    name.includes('unknown') ||
    name.includes('unkown')
  ) {
    return 'House Unknown';
  } else {
    // For all other names, capitalize the name given. As it is their last name most of the time
    // aka they are their own house
    return capitalizeHouseNames(name);
  }
}

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

const renderChart = async () => {
  const fetchApiData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const data = await fetchApiData();
  console.log(data);
  const familyCounts = data.reduce((acc, char) => {
    const correctedFamilyName = standardizeHouseName(char.family);
    if (char.family) {
      acc[correctedFamilyName] = (acc[correctedFamilyName] || 0) + 1;
    }
    return acc;
  }, {});

  const labels = Object.keys(familyCounts);
  const familyData = Object.values(familyCounts);
  const donutChart = document.querySelector('.donut-chart');

  new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'My First Dataset',
          data: familyData,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
  });
};

renderChart();
