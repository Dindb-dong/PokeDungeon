export const getUserRegionByIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/'); // IP로 위치 가져오기
    const data = await response.json();
    console.log('IP 기반 위치 정보:', data);

    return data.country_name || 'Unknown';
  } catch (error) {
    console.error('IP 기반 위치 확인 실패:', error);
    return 'Unknown';
  }
};