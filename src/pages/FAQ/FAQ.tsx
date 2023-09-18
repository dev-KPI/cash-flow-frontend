import {FC } from "react";
//UI
import classes from'./FAQ.module.css';
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import Accordion, { AccordionTab } from "@components/Accordion/Accordion";
//logic

const FAQ: FC = () => {

    return(<>
        <main id={'FAQPage'} >
            <div className={classes.page__container}>
                <div className={classes.page__center}>
                    <h2 className={classes.title}>Contact Us</h2>
                    <p className={classes.subtitle}>Have any questions? We'd love to hear from you.</p>
                </div>
                <ul className={classes.contact__list}>
                    <li className={classes.contact__item}>
                        <div className={classes.contact__inner}>
                            <i className="bi bi-github" style={{ fontSize: 36, color: 'var(--main-text)' }}></i>
                            <h5 className={classes.contact__title}>Experiencing issues with UI?</h5>
                            <p className={classes.contact__text}>If you have such issues as rendering or displaying a web page, troubles with user interactions, please left a report with  description of problem.</p>
                            <a className={classes.contact__link} href="https://github.com/dev-KPI/cash-flow-frontend/issues/new" target="_blank">Left a client-side bug report<ArrowRight className={classes.ArrowRight} /></a>
                        </div>
                    </li>
                    <li className={classes.contact__item}>
                        <div className={classes.contact__inner}>
                            <i className="bi bi-envelope" style={{ fontSize: 36, color: 'var(--main-text)' }}></i>
                            <h5 className={classes.contact__title}>Contact us</h5>
                            <p className={classes.contact__text}>If you have questions or feedback about our app, please do not hesitate to contact us.</p>
                            <a className={classes.contact__link} href="mailto:cashflow.feedback@gmail.com?subject=Feedback&body=Message">cashflow.feedback@gmail.com</a>
                        </div>
                    </li>
                    <li className={classes.contact__item}>
                        <div className={classes.contact__inner}>
                            <i className="bi bi-github" style={{ fontSize: 36, color: 'var(--main-text)' }}></i>
                            <h5 className={classes.contact__title}>Experiencing technical issues?</h5>
                            <p className={classes.contact__text}>Doubt about the privacy of data? Create a report with clear and concise suggestions to help us improve our product.</p>
                            <a className={classes.contact__link} href="https://github.com/RezenkovD/cash-money/issues/new" target="_blank">Left a server-side bug report<ArrowRight className={classes.ArrowRight} /></a>
                        </div>
                    </li>
                </ul>
                <div className={classes.faq}>
                    <h2 className={classes.title}>FAQ</h2>
                    <div className={classes.faq__list}>
                        <Accordion>
                            <AccordionTab title="Lorem">
                                <p className={classes.faq__text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </AccordionTab>
                            <AccordionTab title="Lorem">
                                <p className={classes.faq__text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </AccordionTab>
                        </Accordion>
                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default FAQ