import React, {useMemo} from 'react';
import {View} from 'react-native';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import * as Expensicons from '@components/Icon/Expensicons';
import * as Illustrations from '@components/Icon/Illustrations';
import LottieAnimations from '@components/LottieAnimations';
import MenuItem from '@components/MenuItem';
import MenuItemList from '@components/MenuItemList';
import ScreenWrapper from '@components/ScreenWrapper';
import ScrollView from '@components/ScrollView';
import Section from '@components/Section';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWaitForNavigation from '@hooks/useWaitForNavigation';
import Navigation from '@libs/Navigation/Navigation';
import type {TranslationPaths} from '@src/languages/types';
import ROUTES from '@src/ROUTES';

function SecuritySettingsPage() {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const waitForNavigate = useWaitForNavigation();
    const {shouldUseNarrowLayout} = useResponsiveLayout();
    const theme = useTheme();

    const menuItems = useMemo(() => {
        const baseMenuItems = [
            {
                translationKey: 'twoFactorAuth.headerTitle',
                icon: Expensicons.Shield,
                action: waitForNavigate(() => Navigation.navigate(ROUTES.SETTINGS_2FA.getRoute())),
            },
            {
                translationKey: 'closeAccountPage.closeAccount',
                icon: Expensicons.ClosedSign,
                action: waitForNavigate(() => Navigation.navigate(ROUTES.SETTINGS_CLOSE)),
            },
        ];

        return baseMenuItems.map((item) => ({
            key: item.translationKey,
            title: translate(item.translationKey as TranslationPaths),
            icon: item.icon,
            onPress: item.action,
            shouldShowRightIcon: true,
            link: '',
            wrapperStyle: [styles.sectionMenuItemTopDescription],
        }));
    }, [translate, waitForNavigate, styles]);

    return (
        <ScreenWrapper
            testID={SecuritySettingsPage.displayName}
            includeSafeAreaPaddingBottom={false}
            shouldEnablePickerAvoiding={false}
            shouldShowOfflineIndicatorInWideScreen
        >
            <HeaderWithBackButton
                title={translate('initialSettingsPage.security')}
                shouldShowBackButton={shouldUseNarrowLayout}
                onBackButtonPress={() => Navigation.goBack()}
                icon={Illustrations.LockClosed}
            />
            <ScrollView contentContainerStyle={styles.pt3}>
                <View style={[styles.flex1, shouldUseNarrowLayout ? styles.workspaceSectionMobile : styles.workspaceSection]}>
                    <Section
                        title={translate('securityPage.title')}
                        subtitle={translate('securityPage.subtitle')}
                        isCentralPane
                        subtitleMuted
                        illustration={LottieAnimations.Safe}
                        titleStyles={styles.accountSettingsSectionTitle}
                        childrenStyles={styles.pt5}
                    >
                        <MenuItemList
                            menuItems={menuItems}
                            shouldUseSingleExecution
                        />
                    </Section>
                    <Section
                        title={translate('delegate.copilotDelegatedAccess')}
                        subtitle={translate('delegate.copilotDelegatedAccessDescription')}
                        isCentralPane
                        subtitleMuted
                        titleStyles={styles.accountSettingsSectionTitle}
                        childrenStyles={styles.pt5}
                    >
                        {/* add copilot menu item with add member icon */}
                        <MenuItem
                            title={translate('delegate.addCopilot')}
                            // TODO: replace with user plus icon
                            icon={Expensicons.UserCheck}
                            iconFill={theme.iconSuccessFill}
                            onPress={() => {}}
                            shouldShowRightIcon
                            wrapperStyle={[styles.sectionMenuItemTopDescription]}
                        />
                    </Section>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

SecuritySettingsPage.displayName = 'SettingSecurityPage';

export default SecuritySettingsPage;
