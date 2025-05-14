export function getCurrentDateFormatted() {
  const now = new Date();

  // 获取年份
  const year = now.getFullYear();

  // 获取月份 (注意月份是从 0 开始的，所以需要 +1)
  const month = now.getMonth() + 1;

  // 获取日期
  const day = now.getDate();

  // 格式化月份和日期，确保是两位数
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;

  // 组合成 YYYY-MM-DD 格式
  return `${year}-${formattedMonth}-${formattedDay}`;
}
