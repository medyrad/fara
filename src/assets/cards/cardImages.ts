import i1434 from "./photo-1434626881859-194d67b2b86f.jpg";
import i1450 from "./photo-1450101499163-c8848c66ca85.jpg";
import i1456 from "./photo-1456513080510-7bf3a84b82f8.jpg";
import i1460 from "./photo-1460925895917-afdab827c52f.jpg";
import i1507 from "./photo-1507679799987-c73779587ccf.jpg";
import i1512 from "./photo-1512941937669-90a1b58e7e9c.jpg";
import i1518 from "./photo-1518186285589-2f7649de83e0.jpg";
import i1521 from "./photo-1521737604893-d14cc237f11d.jpg";
import i1540 from "./photo-1540575467063-178a50c2df87.jpg";
import i1543 from "./photo-1543286386-713bdd548da4.jpg";
import i1551 from "./photo-1551288049-bebda4e38f71.jpg";
import i1554 from "./photo-1554224155-6726b3ff858f.jpg";
import i1559 from "./photo-1559526324-4b87b5e36e44.jpg";
import i1560a from "./photo-1560221328-12fe60f83ab8.jpg";
import i1560b from "./photo-1560472354-b33ff0c44a43.jpg";
import i1579 from "./photo-1579532537598-459ecdaf39cc.jpg";
import i1590 from "./photo-1590283603385-17ffb3a7f29f.jpg";
import i1610 from "./photo-1610375461246-83df859d849d.jpg";
import i1611 from "./photo-1611974789855-9c2a0a7236a3.jpg";
import i1616 from "./photo-1616261167032-b16d2df8333b.jpg";
import i1618a from "./photo-1618044619888-009e412ff12a.jpg";
import i1618b from "./photo-1618044733300-9472054094ee.jpg";
import i1640 from "./photo-1640459958548-56c1c6717a40.jpg";
import i1642 from "./photo-1642790551116-18e4f313f6c9.jpg";
import i1643a from "./photo-1643962577481-4ff81600e439.jpg";
import i1643b from "./photo-1643962579745-bcaa05ffc573.jpg";
import i1651a from "./photo-1651340981821-b519ad14da7c.jpg";
import i1651b from "./photo-1651341050677-24dba59ce0fd.jpg";
import i1734 from "./photo-1734503937317-3b88a42ac50c.jpg";
import i1745a from "./photo-1745509267699-1b1db256601e.jpg";
import i1745b from "./photo-1745509267945-b25cbb4d50ef.jpg";
import i1771 from "./photo-1771931322109-180bb1b35bf8.jpg";

const MAP: Record<string, string> = {
  "photo-1434626881859-194d67b2b86f": i1434,
  "photo-1450101499163-c8848c66ca85": i1450,
  "photo-1456513080510-7bf3a84b82f8": i1456,
  "photo-1460925895917-afdab827c52f": i1460,
  "photo-1507679799987-c73779587ccf": i1507,
  "photo-1512941937669-90a1b58e7e9c": i1512,
  "photo-1518186285589-2f7649de83e0": i1518,
  "photo-1521737604893-d14cc237f11d": i1521,
  "photo-1540575467063-178a50c2df87": i1540,
  "photo-1543286386-713bdd548da4": i1543,
  "photo-1551288049-bebda4e38f71": i1551,
  "photo-1554224155-6726b3ff858f": i1554,
  "photo-1559526324-4b87b5e36e44": i1559,
  "photo-1560221328-12fe60f83ab8": i1560a,
  "photo-1560472354-b33ff0c44a43": i1560b,
  "photo-1579532537598-459ecdaf39cc": i1579,
  "photo-1590283603385-17ffb3a7f29f": i1590,
  "photo-1610375461246-83df859d849d": i1610,
  "photo-1611974789855-9c2a0a7236a3": i1611,
  "photo-1616261167032-b16d2df8333b": i1616,
  "photo-1618044619888-009e412ff12a": i1618a,
  "photo-1618044733300-9472054094ee": i1618b,
  "photo-1640459958548-56c1c6717a40": i1640,
  "photo-1642790551116-18e4f313f6c9": i1642,
  "photo-1643962577481-4ff81600e439": i1643a,
  "photo-1643962579745-bcaa05ffc573": i1643b,
  "photo-1651340981821-b519ad14da7c": i1651a,
  "photo-1651341050677-24dba59ce0fd": i1651b,
  "photo-1734503937317-3b88a42ac50c": i1734,
  "photo-1745509267699-1b1db256601e": i1745a,
  "photo-1745509267945-b25cbb4d50ef": i1745b,
  "photo-1771931322109-180bb1b35bf8": i1771,
};

export function cardImg(url: string): string {
  const match = url.match(/photo-[a-zA-Z0-9_-]+/);
  if (match && MAP[match[0]]) return MAP[match[0]];
  return url;
}
