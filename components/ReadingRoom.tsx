import { board, person } from "@/data/site";
import Magnet from "./Magnet";
import Roll from "./Roll";
import Link from "next/link";
import r from "./room.module.css";

/** The dark closing board with a lamp glow and a running ticker tape. */
export default function ReadingRoom() {
  const items = [...board.tape, ...board.tape];
  return (
    <section id="contact" className={r.board} aria-labelledby="room-title">
      <div className={r.lamp} aria-hidden="true" />
      <div className={r.tape} aria-hidden="true">
        <div className={r.track}>
          {items.map((t, i) => (
            <span key={i} className={r.item}>{t}<span className={r.dot} /></span>
          ))}
        </div>
      </div>
      <div className={`shell ${r.inner}`}>
        <span className={`eyebrow ${r.eyebrow}`} data-reveal><span className="eyebrow-rule" />{board.eyebrow}</span>
        <h2 id="room-title" className={r.title} data-split>{board.title}</h2>
        <p className={r.lead} data-reveal>{board.lead}</p>
        <div className={r.row} data-reveal>
          <a href={`mailto:${person.email}`} className={`${r.mono} ulink`}>{person.email}</a>
          <span className={r.mono}>{person.city}, {person.country}</span>
          <span className={r.mono}>{person.reply}</span>
        </div>
        <div className="cta-row" data-reveal>
          <Magnet href="/contact/" className={`cta ${r.cta}`}><Roll>Start a conversation</Roll></Magnet>
          <Link href="/cv/" className={`cta ${r.ghost}`}><Roll>Read the résumé</Roll></Link>
        </div>
        <p className={r.note} data-reveal>I read every message myself. {person.availability}.</p>
      </div>
    </section>
  );
}
