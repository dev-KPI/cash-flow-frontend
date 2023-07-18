import React, { FC, useEffect, useState } from 'react';

//UI
import classes from './GroupInfoCard.module.css';
import { isUrl, numberWithCommas } from '@services/UsefulMethods/UIMethods';
import userIcon from '@assets/user-icon.svg';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import GroupInfoCardLoader from './GroupInfoCardLoader';

const GroupInfoCard: FC = () => {
    const [loading, setLoading] = useState(true);
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    const Group = JSON.parse(JSON.stringify(
        {
            "group": {
                "id": 1,
                "title": "Family",
                "descriptions": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis reiciendis sit facere nesciunt illo esse molestiae nam, sunt debitis nulla quis eveniet non? Odit quo neque, adipisci explicabo cum non voluptatum magnam doloribus velit blanditiis enim alias nemo natus harum et maiores, assumenda nostrum quam ipsa aliquam soluta exercitationem numquam! In numquam id voluptatem commodi delectus dignissimos impedit deleniti nulla, laboriosam porro minima libero dolorem maxime labore, architecto iste hic cum quisquam quos mollitia alias ea incidunt repudiandae. Officiis nobis quod neque accusamus, vero at eos consequatur provident, autem corporis id sed doloremque praesentium aut velit fugiat molestias. Atque, pariatur..",
                "status": "ACTIVE",
                "admin": {
                    "id": 1,
                    "login": "johndoe@gmail.com",
                    "first_name": "John",
                    "last_name": "Doe",
                    "picture": "resd3f.3com"
                },
                "color_code": "#4C6FFF",
                "icon_url": "https://lh3.googleusercontent.com/drive-viewer/AFGJ81rEWXFEZp7U0wBui-1pSqWj0HjweJaJQ6O5tW77mK86lr8lVruUdpB7DLE9wbit73fmcbDptSF6bXVhr99mDiasN4Zexg=w1920-h937"
            },
            "details": {
                "members": 4,
                "expenses": 142
            }

        }
    ))
    const { id, title, descriptions, color_code, icon_url } = Group.group;
    const { members, expenses  } = Group.details;
    const description  = descriptions.length > 150 ? descriptions.slice(0, 180) + '...' : descriptions;
    const getAdminIcon = () => {
        return isUrl(icon_url) ?
            <img className={classes.photo}
                alt={'user icon'}
                src={icon_url} />
            :
            <div className={classes.icon}
                style={{ backgroundColor: color_code }}>
                <i className={"bi bi-people"}></i>
            </div>
    }
    setTimeout(() => {
        setLoading(false)
    }, 1500);

    return (
        <div className={classes.GroupInfoCard}>
            {loading ? <GroupInfoCardLoader /> :
                <div className={classes.inner}>
                    <div className={classes.group}>
                        <div className={classes.avatar}>{getAdminIcon()}</div>
                        <div className={classes.group__info}>
                            <h4 className={classes.title}>{title}</h4>
                            <ul className={classes.details}>
                                <li className={classes.detailItem}>
                                    <p className={classes.detailNumber}>{members}</p>
                                    <p className={classes.detailTitle}>Members</p>
                                </li>
                                <li className={classes.detailItem}>
                                    <p className={classes.detailNumber}>{expenses}</p>
                                    <p className={classes.detailTitle}>Expenses</p>
                                </li>
                            </ul>
                        </div>
                        <div className={classes.description}>{description}</div>
                    </div>
                </div>}
        </div>
    )
}
export default GroupInfoCard