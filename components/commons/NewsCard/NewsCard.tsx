export interface INewsCardProps {
  img: string;
  date: Date;
  title: string;
  content: string;
}

export function NewsCard({ img, date, title, content }: INewsCardProps) {
  return (
    <div>
      <img src={img} />
      <div>
        <p>{date}</p>
        <p>by Adming</p>
        <p>Teachers, School</p>
      </div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}
