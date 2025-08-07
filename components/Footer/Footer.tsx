// Компонент Footer має створювати наступну розмітку:

import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Oleksandr Riabokon</p>
          <p>
            Contact us:
            <a href="mailto:riabokon.oleksandr@gmail.com">
              riabokon.oleksandr@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
