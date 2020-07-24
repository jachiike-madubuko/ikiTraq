<TabView
    selectedIndex={topTabsIndex}
    shouldLoadComponent={shouldLoadComponent}

    onSelect={setTopTabsIndex}>

    <Tab icon={PersonIcon}>
        <Layout >
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <FloMasterDetail topTabsIndex={topTabsIndex} index={0} dayId={dayId} type={"morning"} data={morningFloTasks} />
            </ScrollView>
        </Layout>
    </Tab>
    <Tab icon={BellIcon}>
        <Layout >
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <FloTasks topTabsIndex={topTabsIndex} index={1} dayId={dayId} type={"grind"} data={grindFloTasks} />
            </ScrollView>
        </Layout>
    </Tab>
    <Tab icon={EmailIcon}>
        <Layout >
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <FloTasks topTabsIndex={topTabsIndex} index={2} dayId={dayId} type={"night"} data={nightFloTasks} />
            </ScrollView>
        </Layout>
    </Tab>
</TabView>