import {
	bigint,
	datetime,
	double,
	index,
	int,
	longtext,
	mysqlTable,
	timestamp,
	tinyint,
	unique,
	varchar
} from "drizzle-orm/mysql-core";

export const announcements = mysqlTable("announcements", {
	announcementId: int("announcement_id").autoincrement().notNull(),
	type: varchar("type", { length: 50 }).default('NULL'),
	announcement: longtext("announcement").notNull(),
	addedBy: int("added_by").notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).notNull(),
	expireOn: datetime("expire_on", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		announcementId: index("announcement_id").on(table.announcementId),
	}
});

export const characters = mysqlTable("characters", {
	characterId: int("character_id").autoincrement().notNull(),
	firstName: longtext("first_name").default('NULL'),
	lastName: longtext("last_name").default('NULL'),
	gender: int("gender").default('NULL'),
	jobName: longtext("job_name").default('NULL'),
	departmentName: longtext("department_name").default('NULL'),
	positionName: longtext("position_name").default('NULL'),
	dateOfBirth: longtext("date_of_birth").default('NULL'),
	phoneNumber: longtext("phone_number").default('NULL'),
	licenseIdentifier: longtext("license_identifier").default('NULL'),
	mugshot: longtext("mugshot").default('NULL'),
},
(table) => {
	return {
		idxCharacterId: index("idx_character_id").on(table.characterId),
	}
});

export const characterExpungements = mysqlTable("character_expungements", {
	expungementId: int("expungement_id").autoincrement().notNull(),
	characterId: int("character_id").notNull(),
	expungementNote: longtext("expungement_note").default('NULL'),
	expungementDate: datetime("expungement_date", { mode: 'string'}).notNull(),
	addedBy: int("added_by").notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).notNull(),
},
(table) => {
	return {
		expungementId: unique("expungement_id").on(table.expungementId),
	}
});

export const characterNotes = mysqlTable("character_notes", {
	noteId: int("note_id").autoincrement().notNull(),
	characterId: int("character_id").notNull(),
	characterNote: longtext("character_note").notNull(),
	type: varchar("type", { length: 50 }).default('general'),
	addedBy: int("added_by").notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).notNull(),
},
(table) => {
	return {
		noteId: unique("note_id").on(table.noteId),
	}
});

export const characterPictures = mysqlTable("character_pictures", {
	pictureId: int("picture_id").autoincrement().notNull(),
	characterId: int("character_id").notNull(),
	characterPictureUrl: longtext("character_picture_url").notNull(),
	addedBy: int("added_by").notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).notNull(),
},
(table) => {
	return {
		pictureId: unique("picture_id").on(table.pictureId),
	}
});

export const characterPoints = mysqlTable("character_points", {
	resetId: int("reset_id").autoincrement().notNull(),
	characterId: int("character_id").notNull(),
	resetDate: datetime("reset_date", { mode: 'string'}).notNull(),
	addedBy: int("added_by").notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).notNull(),
},
(table) => {
	return {
		expungementId: unique("expungement_id").on(table.resetId),
	}
});

export const characterProperties = mysqlTable("character_properties", {
	propertyId: int("property_id").autoincrement().notNull(),
	characterId: int("character_id").default('NULL'),
	address: varchar("address", { length: 100 }).default('NULL'),
	addedBy: int("added_by").default('NULL'),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		propertyId: unique("property_id").on(table.propertyId),
	}
});

export const characterTags = mysqlTable("character_tags", {
	tagId: int("tag_id").autoincrement().notNull(),
	characterId: int("character_id").default('NULL'),
	value: longtext("value").notNull(),
	backgroundColor: varchar("background_color", { length: 50 }).default('').notNull(),
	textColor: varchar("text_color", { length: 50 }).notNull(),
	addedBy: int("added_by").default('NULL'),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		tagId: unique("tag_id").on(table.tagId),
	}
});

export const characterVehicles = mysqlTable("character_vehicles", {
	vehicleId: int("vehicle_id").autoincrement().notNull(),
	ownerCid: int("owner_cid").default(0).notNull(),
	name: varchar("name", { length: 100 }).default('').notNull(),
	plate: varchar("plate", { length: 50 }).default('').notNull(),
	photo: longtext("photo").default('NULL'),
	addedBy: int("added_by").default('NULL'),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		vehicleId: unique("vehicle_id").on(table.vehicleId),
	}
});

export const characterWarrantsBolos = mysqlTable("character_warrants_bolos", {
	id: int("id").autoincrement().notNull(),
	characterId: int("character_id").notNull(),
	officerId: int("officer_id").notNull(),
	details: longtext("details").default('NULL'),
	served: int("served").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default('current_timestamp()').notNull(),
});

export const demotions = mysqlTable("demotions", {
	demotionsId: int("demotions_id").autoincrement().notNull(),
	weekNumber: int("week_number").notNull(),
	demotionFor: int("demotion_for").notNull(),
	demotionBy: int("demotion_by").notNull(),
	reasoning: longtext("reasoning").notNull(),
},
(table) => {
	return {
		demotionsIdUnique: unique("demotions_id_UNIQUE").on(table.demotionsId),
	}
});

export const incidents = mysqlTable("incidents", {
	incidentId: int("incident_id").autoincrement().notNull(),
	title: varchar("title", { length: 100 }).notNull(),
	type: varchar("type", { length: 100 }).notNull(),
	location: varchar("location", { length: 100 }).notNull(),
	createdBy: int("created_by").default('NULL'),
	createdDateTime: datetime("created_date_time", { mode: 'string'}).default('NULL'),
	updatedBy: int("updated_by").default('NULL'),
	updatedDateTime: datetime("updated_date_time", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		incidentIdUnique: unique("incident_id_UNIQUE").on(table.incidentId),
	}
});

export const incidentArrests = mysqlTable("incident_arrests", {
	arrestId: int("arrest_id").autoincrement().notNull(),
	incidentId: int("incident_id").default(0).notNull(),
	characterId: int("character_id").notNull(),
	time: int("time").default('NULL'),
	fine: int("fine").default('NULL'),
	plea: varchar("plea", { length: 50 }).default('NULL'),
	itemsReturned: tinyint("items_returned").default(0).notNull(),
	itemsReturnedBy: int("items_returned_by").default('NULL'),
	itemsReturnedDateTime: datetime("items_returned_date_time", { mode: 'string'}).default('NULL'),
	arrestedBy: int("arrested_by").default('NULL'),
	arrestedDateTime: datetime("arrested_date_time", { mode: 'string'}).default('NULL'),
	processedBy: int("processed_by").default('NULL'),
	processedDateTime: datetime("processed_date_time", { mode: 'string'}).default('NULL'),
	sealed: tinyint("sealed").default(0).notNull(),
	sealedBy: int("sealed_by").default('NULL'),
},
(table) => {
	return {
		arrestId: unique("arrest_id").on(table.arrestId),
	}
});

export const incidentArrestsCharges = mysqlTable("incident_arrests_charges", {
	chargeId: int("charge_id").autoincrement().notNull(),
	penalCodeChargeId: int("penal_code_charge_id").default('NULL'),
	arrestId: int("arrest_id").default(0).notNull(),
	enhancements: varchar("enhancements", { length: 100 }).default('NULL'),
	counts: int("counts").default('NULL'),
	addedBy: int("added_by").default('NULL'),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		chargeId: unique("charge_id").on(table.chargeId),
	}
});

export const incidentArrestsItems = mysqlTable("incident_arrests_items", {
	itemId: int("item_id").autoincrement().notNull(),
	arrestId: int("arrest_id").default(0).notNull(),
	type: varchar("type", { length: 50 }).default('0').notNull(),
	item: longtext("item").notNull(),
	addedBy: int("added_by").default(0).notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).notNull(),
},
(table) => {
	return {
		itemId: unique("item_id").on(table.itemId),
	}
});

export const incidentArrestsMugshots = mysqlTable("incident_arrests_mugshots", {
	mugshotId: int("mugshot_id").autoincrement().notNull(),
	arrestId: int("arrest_id").notNull(),
	mugshotTitle: longtext("mugshot_title").notNull(),
	mugshotUrl: longtext("mugshot_url").notNull(),
	addedBy: int("added_by").notNull(),
	addedByDateTime: datetime("added_by_date_time", { mode: 'string'}).notNull(),
},
(table) => {
	return {
		mugshotId: unique("mugshot_id").on(table.mugshotId),
	}
});

export const incidentEvidence = mysqlTable("incident_evidence", {
	evidenceId: int("evidence_id").autoincrement().notNull(),
	incidentId: int("incident_id").default(0).notNull(),
	type: varchar("type", { length: 50 }).default('0').notNull(),
	evidence: longtext("evidence").notNull(),
	addedBy: int("added_by").default(0).notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
},
(table) => {
	return {
		evidenceId: unique("evidence_id").on(table.evidenceId),
	}
});

export const incidentOfficers = mysqlTable("incident_officers", {
	officersId: int("officers_id").autoincrement().notNull(),
	incidentId: int("incident_id").notNull(),
	characterId: int("character_id").notNull(),
	addedBy: int("added_by").notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).notNull(),
	wasInjured: tinyint("was_injured").default(0).notNull(),
},
(table) => {
	return {
		officersIdUnique: unique("officers_id_UNIQUE").on(table.officersId),
	}
});

export const incidentPersons = mysqlTable("incident_persons", {
	personsId: int("persons_id").autoincrement().notNull(),
	incidentId: int("incident_id").notNull(),
	characterId: int("character_id").notNull(),
	phoneNumber: varchar("phone_number", { length: 20 }).default('NULL'),
	type: varchar("type", { length: 20 }).default('NULL'),
	addedBy: int("added_by").default('NULL'),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('NULL'),
});

export const incidentReports = mysqlTable("incident_reports", {
	reportId: int("report_id").autoincrement().notNull(),
	incidentId: int("incident_id").notNull(),
	type: varchar("type", { length: 50 }).default('NULL'),
	report: longtext("report").notNull(),
	addedBy: int("added_by").notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).notNull(),
},
(table) => {
	return {
		idxIncidentReportsIncidentId: index("idx_incident_reports_incident_id").on(table.incidentId),
		reportId: unique("report_id").on(table.reportId),
	}
});

export const incidentTags = mysqlTable("incident_tags", {
	tagId: int("tag_id").autoincrement().notNull(),
	incidentId: int("incident_id").default(0),
	value: longtext("value").notNull(),
	backgroundColor: varchar("background_color", { length: 50 }).default('').notNull(),
	textColor: varchar("text_color", { length: 50 }).default('').notNull(),
	addedBy: int("added_by").default(0),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('0000-00-00 00:00:00'),
},
(table) => {
	return {
		tagId: unique("tag_id").on(table.tagId),
	}
});

export const items = mysqlTable("items", {
	name: varchar("name", { length: 100 }).default('item').notNull(),
	label: varchar("label", { length: 100 }).default('NULL'),
	isWeapon: tinyint("is_weapon").default(0),
	isDrug: tinyint("is_drug").default(0),
	isFood: tinyint("is_food").default(0),
});

export const login = mysqlTable("login", {
	characterId: int("character_id").notNull(),
	password: longtext("password").notNull(),
	resetPassphrase: longtext("reset_passphrase").default('NULL'),
	resetPassphraseDate: datetime("reset_passphrase_date", { mode: 'string'}).default('NULL'),
});

export const logs = mysqlTable("logs", {
	logId: int("logId").autoincrement().notNull(),
	note: longtext("note").notNull(),
	timestamp: datetime("timestamp", { mode: 'string'}).notNull(),
	loggedBy: int("loggedBy").notNull(),
	data: longtext("data").notNull(),
});

export const penalCodeCharges = mysqlTable("penal_code_charges", {
	chargeId: int("charge_id").autoincrement().notNull(),
	title: int("title").default('NULL'),
	label: varchar("label", { length: 50 }).notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	type: varchar("type", { length: 50 }).notNull(),
	definition: longtext("definition").notNull(),
	time: int("time").notNull(),
	fine: int("fine").notNull(),
	result: varchar("result", { length: 50 }).notNull(),
	points: int("points").default('NULL'),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('NULL'),
	deleted: tinyint("deleted").default(0),
});

export const penalCodeDefinitions = mysqlTable("penal_code_definitions", {
	definitionId: int("definition_id").autoincrement().notNull(),
	label: varchar("label", { length: 50 }).default('NULL'),
	value: varchar("value", { length: 50 }).default('NULL'),
	definition: longtext("definition").default('NULL'),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('NULL'),
});

export const penalCodeEnhancements = mysqlTable("penal_code_enhancements", {
	enhancementId: int("enhancement_id").autoincrement().notNull(),
	label: varchar("label", { length: 50 }).default('NULL'),
	name: varchar("name", { length: 50 }).default('NULL'),
	abbreviation: varchar("abbreviation", { length: 50 }).default('NULL'),
	definition: longtext("definition").default('NULL'),
	multiplier: double("multiplier").default('NULL'),
	result: varchar("result", { length: 50 }).default('NULL'),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('NULL'),
});

export const penalCodeTitles = mysqlTable("penal_code_titles", {
	titleId: int("title_id").default('NULL'),
	name: varchar("name", { length: 50 }).default('NULL'),
});

export const ranks = mysqlTable("ranks", {
	rankOrder: int("rank_order").default('NULL'),
	rankName: varchar("rank_name", { length: 50 }).default('NULL'),
});

export const ranksBcso = mysqlTable("ranks_bcso", {
	rankOrder: int("rank_order").default('NULL'),
	rank: varchar("rank", { length: 50 }).default('NULL'),
});

export const ranksFib = mysqlTable("ranks_fib", {
	rankOrder: int("rank_order").default('NULL'),
	rank: varchar("rank", { length: 50 }).default('NULL'),
});

export const ranksFtp = mysqlTable("ranks_ftp", {
	rankOrder: int("rank_order").default('NULL'),
	rank: varchar("rank", { length: 50 }).default('NULL'),
});

export const ranksGw = mysqlTable("ranks_gw", {
	rankOrder: int("rank_order").default('NULL'),
	rank: varchar("rank", { length: 50 }).default('NULL'),
});

export const ranksIa = mysqlTable("ranks_ia", {
	rankOrder: int("rank_order").default('NULL'),
	rank: varchar("rank", { length: 50 }).default('NULL'),
});

export const ranksManagement = mysqlTable("ranks_management", {
	rankOrder: int("rank_order").default('NULL'),
	rank: varchar("rank", { length: 50 }).default('NULL'),
});

export const ranksSahp = mysqlTable("ranks_sahp", {
	rankOrder: int("rank_order").default('NULL'),
	rank: varchar("rank", { length: 50 }).default('NULL'),
});

export const ranksSwat = mysqlTable("ranks_swat", {
	rankOrder: int("rank_order").default('NULL'),
	rank: varchar("rank", { length: 50 }).default('NULL'),
});

export const roster = mysqlTable("roster", {
	characterId: int("character_id").notNull(),
	callsign: varchar("callsign", { length: 50 }).default('NULL'),
	discordId: varchar("discord_id", { length: 100 }).default('').notNull(),
	rank: varchar("rank", { length: 100 }).default('').notNull(),
	status: varchar("status", { length: 100 }).default('').notNull(),
	timezone: varchar("timezone", { length: 10 }).default('').notNull(),
	lastPromotionDate: datetime("last_promotion_date", { mode: 'string'}).default('NULL'),
	joinedDate: datetime("joined_date", { mode: 'string'}).notNull(),
});

export const rosterBcso = mysqlTable("roster_bcso", {
	characterId: int("character_id").notNull(),
	rank: varchar("rank", { length: 50 }).default('NULL'),
	note: varchar("note", { length: 100 }).default('NULL'),
	joinedDate: datetime("joined_date", { mode: 'string'}).default('NULL'),
});

export const rosterCerts = mysqlTable("roster_certs", {
	certId: int("cert_id").autoincrement().notNull(),
	characterId: int("character_id").default(0).notNull(),
	type: varchar("type", { length: 50 }).default('0').notNull(),
	notes: longtext("notes").notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
},
(table) => {
	return {
		certId: unique("cert_id").on(table.certId),
	}
});

export const rosterChanges = mysqlTable("roster_changes", {
	rosterChangeId: int("roster_change_id").autoincrement().notNull(),
	changedOfficer: int("changed_officer").default(0).notNull(),
	changedType: varchar("changed_type", { length: 50 }).default('NULL'),
	changedText: longtext("changed_text").notNull(),
	changedBy: int("changed_by").default(0).notNull(),
	changedDateTime: datetime("changed_date_time", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
},
(table) => {
	return {
		rosterChangeId: unique("roster_change_id").on(table.rosterChangeId),
	}
});

export const rosterDoj = mysqlTable("roster_doj", {
	characterId: int("character_id").notNull(),
	discordId: varchar("discord_id", { length: 100 }).default('').notNull(),
	rank: varchar("rank", { length: 50 }).default('').notNull(),
	joinedDate: datetime("joined_date", { mode: 'string'}).notNull(),
});

export const rosterFib = mysqlTable("roster_fib", {
	characterId: int("character_id").notNull(),
	rank: varchar("rank", { length: 50 }).default('').notNull(),
	note: varchar("note", { length: 100 }).default(''),
	joinedDate: datetime("joined_date", { mode: 'string'}).default('NULL'),
});

export const rosterFtp = mysqlTable("roster_ftp", {
	characterId: int("character_id").notNull(),
	rank: varchar("rank", { length: 50 }).default(''),
	note: varchar("note", { length: 100 }).default(''),
	joinedDate: datetime("joined_date", { mode: 'string'}).default('NULL'),
});

export const rosterGw = mysqlTable("roster_gw", {
	characterId: int("character_id").notNull(),
	rank: varchar("rank", { length: 50 }).default(''),
	note: varchar("note", { length: 100 }).default(''),
	joinedDate: datetime("joined_date", { mode: 'string'}).default('NULL'),
});

export const rosterIa = mysqlTable("roster_ia", {
	characterId: int("character_id").notNull(),
	rank: varchar("rank", { length: 50 }).default(''),
	note: varchar("note", { length: 100 }).default(''),
	joinedDate: datetime("joined_date", { mode: 'string'}).default('NULL'),
});

export const rosterManagement = mysqlTable("roster_management", {
	characterId: int("character_id").notNull(),
	rank: varchar("rank", { length: 50 }).default(''),
	note: varchar("note", { length: 100 }).default(''),
	joinedDate: datetime("joined_date", { mode: 'string'}).default('NULL'),
});

export const rosterNotes = mysqlTable("roster_notes", {
	noteId: int("note_id").autoincrement().notNull(),
	characterId: int("character_id").default(0).notNull(),
	type: varchar("type", { length: 50 }).notNull(),
	note: longtext("note").notNull(),
	addedBy: int("added_by").default(0).notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
},
(table) => {
	return {
		noteId: unique("noteId").on(table.noteId),
	}
});

export const rosterSahp = mysqlTable("roster_sahp", {
	characterId: int("character_id").notNull(),
	rank: varchar("rank", { length: 50 }).default(''),
	note: varchar("note", { length: 100 }).default(''),
	joinedDate: datetime("joined_date", { mode: 'string'}).default('NULL'),
});

export const rosterStrikes = mysqlTable("roster_strikes", {
	strikeId: int("strike_id").autoincrement().notNull(),
	characterId: int("character_id").default(0).notNull(),
	type: varchar("type", { length: 50 }).default('0').notNull(),
	reason: longtext("reason").notNull(),
	authorizedBy: int("authorized_by").default(0).notNull(),
	addedBy: int("added_by").default(0).notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('NULL'),
},
(table) => {
	return {
		strikeId: unique("strike_id").on(table.strikeId),
	}
});

export const rosterSwat = mysqlTable("roster_swat", {
	characterId: int("character_id").notNull(),
	rank: varchar("rank", { length: 50 }).default(''),
	note: varchar("note", { length: 100 }).default(''),
	joinedDate: datetime("joined_date", { mode: 'string'}).default('NULL'),
});

export const tags = mysqlTable("tags", {
	tagId: int("tag_id").default('NULL'),
	tagValue: int("tag_value").default('NULL'),
	tagColor: varchar("tag_color", { length: 50 }).default('NULL'),
});

export const time = mysqlTable("time", {
	characterId: int("character_id").notNull(),
	onDutyTime: longtext("on_duty_time").default('NULL'),
});

export const timeExtra = mysqlTable("time_extra", {
	timeId: int("time_id").autoincrement().notNull(),
	characterId: int("character_id").default(0).notNull(),
	reasoning: longtext("reasoning").notNull(),
	extraTime: int("extra_time").default(0).notNull(),
	weekNumber: int("week_number").default(0).notNull(),
	addedBy: int("added_by").default(0).notNull(),
	addedDateTime: datetime("added_date_time", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
},
(table) => {
	return {
		timeId: unique("time_id").on(table.timeId),
	}
});

export const vehicles = mysqlTable("vehicles", {
	modelName: varchar("model_name", { length: 50 }).default('vehicle').notNull(),
	label: varchar("label", { length: 50 }).default('NULL'),
	id: varchar("id", { length: 50 }).default('NULL'),
});

export const votes = mysqlTable("votes", {
	voteId: int("vote_id").autoincrement().notNull(),
	voteWeek: int("vote_week").default(0).notNull(),
	votedBy: int("voted_by").default(0).notNull(),
	voteFor: int("vote_for").default(0).notNull(),
	vote: bigint("vote", { mode: "number" }).notNull(),
	reasoning: longtext("reasoning").default('NULL'),
},
(table) => {
	return {
		voteId: unique("vote_id").on(table.voteId),
	}
});

export const apiKeys = mysqlTable("api_keys", {
	id: int("id").autoincrement().notNull(),
	apiKey: varchar("api_key",{length: 255}).notNull(),
	isActive: tinyint("is_active",{length: 1}).default(1).notNull(),
	description: varchar("description",{length: 255}).default(''),
},
(table) => {
	return {
		apiKey: unique("api_key").on(table.apiKey),
	}
});

export const sessions = mysqlTable('sessions', {
	id: int('id').primaryKey().autoincrement(),
	userId: int('user_id').notNull(),
	accessToken: longtext('access_token').notNull(),
	refreshToken: longtext('refresh_token').notNull(),
	isRevoked: tinyint('is_revoked',{length: 1}).notNull().default(0),
	expiresAt: timestamp('expires_at').notNull()
});
