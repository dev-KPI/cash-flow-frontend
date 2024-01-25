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
                            <a className={classes.contact__link} href="https://github.com/dev-KPI/cash-flow-frontend/issues/new" target="_blank" rel="noreferrer">Left a client-side bug report<ArrowRight className={classes.ArrowRight} /></a>
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
                            <a className={classes.contact__link} href="https://github.com/RezenkovD/cash-money/issues/new" target="_blank" rel="noreferrer">Left a server-side bug report<ArrowRight className={classes.ArrowRight} /></a>
                        </div>
                    </li>
                </ul>
                <div className={classes.faq}>
                    <h2 className={classes.title}>FAQ</h2>
                    <div className={classes.faq__list}>
                        <Accordion>
                            <AccordionTab title="Why can't I record an expense using the expenses card, near the income card?">
                                <p className={classes.faq__text}>Because this card defines the total costs of the user and serves only for information.</p>
                            </AccordionTab>
                            <AccordionTab title="How can I record an expense?">
                                <p className={classes.faq__text}>You must create a group and a category for the group to be able to record the expense. This can be done on the group page or on the dashboard page by selecting the group and category to which the expenses will be allocated.</p>
                            </AccordionTab>
                            <AccordionTab title="Can I use a group for one person?">
                                <p className={classes.faq__text}>Yes, because it is the only way to track the expenses. You can't interact with expenses without creating a group and categories.</p>
                            </AccordionTab>
                        </Accordion>
                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default FAQ