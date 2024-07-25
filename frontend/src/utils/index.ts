import dayjs from "dayjs";
import "dayjs/locale/ko";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.locale("ko");
dayjs.extend(customParseFormat);
export const convertDateFormat = (dateString: string) => {
  return dayjs(dateString, "YY년 MM월 DD일 HH시 mm분").format(
    "YYYY-MM-DDTHH:mm"
  );
};