// MarqueeCards.jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

const MarqueeCards = ({cards}) => {
  

  return (
    <>
      {cards.map((card, idx) => (
        <Card key={idx} className={`w-48 h-32 `}>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={card.logo} alt={card.title} className="h-10" />
          </CardContent>
        </Card>
      ))} 
    </>  
  )
}

export default MarqueeCards
