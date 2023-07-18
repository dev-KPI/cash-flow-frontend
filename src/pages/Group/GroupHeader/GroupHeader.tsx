import { GroupObj } from '@pages/GroupObj';
import { IGroup } from '@pages/Groups/GroupsPage';
import { isUrl } from '@services/UsefulMethods/UIMethods';
import { useParams } from 'react-router-dom';

//UI
import classes from './GroupHeader.module.css'
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import userIcon from '@assets/user-icon.svg';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';


const GroupHeader = () => {
    const { groupId } = useParams<{ groupId: string }>();

    const breadcrumbs = [
        {
            'title': 'Dashboard',
            'link': `/group/${groupId}`
        },
        {
            'title': 'Members',
            'link': `/group/${groupId}/members/`
        },
        {
            'title': 'History',
            'link': `/group/${groupId}/history`
        },
    ]
    const handleSubmit = () => {
        console.log(1);
    }
    let groups: IGroup[] = GroupObj;
    let groupTitle = 'Not found'
    let memberIcons: string[] = [];
    if (groupId) {
        const group = groups.find(item => item.group.id === +groupId)
        groupTitle = group?.group.title ?? 'Not found'
        memberIcons = group?.group.members.map(member => member.picture) ?? [];
    }
    
    
    const getMemberIcons = () => {
        return memberIcons.map((icon, i) =>
            <div key={i} className={classes.avatar}>
                <img className={classes.photo}
                    alt={'user icon'}
                    src={isUrl(icon) ? icon : userIcon}
                />
            </div>
        ).slice(0, 3)
    }
    
    return (
        <div className={classes.header}>
            <div className={classes.header__container}>
                <h1 className={`${classes.title} pageTitle`}>{groupTitle}</h1>
                <nav className={classes.breadcrumbs}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </nav>
                <div className={classes.header__right}>
                    <div className={classes.members}>
                        {getMemberIcons()}
                        {memberIcons.length > 3 ?
                            <div className={classes.avatar}>
                                <div className={classes.avatarLeftMembers}
                                    style={{ backgroundColor: 'var(--main-green)' }}></div>
                                <p className={classes.leftMembers}
                                    style={{ color: 'var(--main-green)' }}
                                >+{memberIcons.length - 3}
                                </p>
                            </div>
                            : null
                        }
                    </div>
                    <CustomButton
                        isPending={false}
                        children="Leave group"
                        btnWidth={120}
                        btnHeight={30}
                        icon={'none'}
                        type="danger"
                        background={'outline'}
                        callback={handleSubmit}
                        className={`${classes.leaveButton} btn-danger outline`} />
                </div>
            </div>
        </div>
    );
};

export default GroupHeader;