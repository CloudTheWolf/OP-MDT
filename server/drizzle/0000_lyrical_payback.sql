CREATE TABLE IF NOT EXISTS `announcements` (
	`announcement_id` int(11) AUTO_INCREMENT NOT NULL,
	`type` varchar(50) DEFAULT 'NULL',
	`announcement` longtext NOT NULL,
	`added_by` int(11) NOT NULL,
	`added_date_time` datetime NOT NULL,
	`expire_on` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `characters` (
	`character_id` int(11) AUTO_INCREMENT NOT NULL,
	`first_name` longtext DEFAULT 'NULL',
	`last_name` longtext DEFAULT 'NULL',
	`gender` int(11) DEFAULT 'NULL',
	`job_name` longtext DEFAULT 'NULL',
	`department_name` longtext DEFAULT 'NULL',
	`position_name` longtext DEFAULT 'NULL',
	`date_of_birth` longtext DEFAULT 'NULL',
	`phone_number` longtext DEFAULT 'NULL',
	`license_identifier` longtext DEFAULT 'NULL',
	`mugshot` longtext DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `character_expungements` (
	`expungement_id` int(11) AUTO_INCREMENT NOT NULL,
	`character_id` int(11) NOT NULL,
	`expungement_note` longtext DEFAULT 'NULL',
	`expungement_date` datetime NOT NULL,
	`added_by` int(11) NOT NULL,
	`added_date_time` datetime NOT NULL,
	CONSTRAINT `expungement_id` UNIQUE(`expungement_id`)
);

CREATE TABLE IF NOT EXISTS `character_notes` (
	`note_id` int(11) AUTO_INCREMENT NOT NULL,
	`character_id` int(11) NOT NULL,
	`character_note` longtext NOT NULL,
	`type` varchar(50) DEFAULT ''general'',
	`added_by` int(11) NOT NULL,
	`added_date_time` datetime NOT NULL,
	CONSTRAINT `note_id` UNIQUE(`note_id`)
);

CREATE TABLE IF NOT EXISTS `character_pictures` (
	`picture_id` int(11) AUTO_INCREMENT NOT NULL,
	`character_id` int(11) NOT NULL,
	`character_picture_url` longtext NOT NULL,
	`added_by` int(11) NOT NULL,
	`added_date_time` datetime NOT NULL,
	CONSTRAINT `picture_id` UNIQUE(`picture_id`)
);

CREATE TABLE IF NOT EXISTS `character_points` (
	`reset_id` int(11) AUTO_INCREMENT NOT NULL,
	`character_id` int(11) NOT NULL,
	`reset_date` datetime NOT NULL,
	`added_by` int(11) NOT NULL,
	`added_date_time` datetime NOT NULL,
	CONSTRAINT `expungement_id` UNIQUE(`reset_id`)
);

CREATE TABLE IF NOT EXISTS `character_properties` (
	`property_id` int(11) AUTO_INCREMENT NOT NULL,
	`character_id` int(11) DEFAULT 'NULL',
	`address` varchar(100) DEFAULT 'NULL',
	`added_by` int(11) DEFAULT 'NULL',
	`added_date_time` datetime DEFAULT 'NULL',
	CONSTRAINT `property_id` UNIQUE(`property_id`)
);

CREATE TABLE IF NOT EXISTS `character_tags` (
	`tag_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`character_id` int(11) DEFAULT 'NULL',
	`value` longtext NOT NULL,
	`background_color` varchar(50) NOT NULL DEFAULT '''',
	`text_color` varchar(50) NOT NULL,
	`added_by` int(11) DEFAULT 'NULL',
	`added_date_time` datetime DEFAULT 'NULL',
	CONSTRAINT `tag_id` UNIQUE(`tag_id`)
);

CREATE TABLE IF NOT EXISTS `character_vehicles` (
	`vehicle_id` int(11) AUTO_INCREMENT NOT NULL,
	`owner_cid` int(11) NOT NULL DEFAULT 0,
	`name` varchar(100) NOT NULL DEFAULT '''',
	`plate` varchar(50) NOT NULL DEFAULT '''',
	`photo` longtext DEFAULT 'NULL',
	`added_by` int(11) DEFAULT 'NULL',
	`added_date_time` datetime DEFAULT 'NULL',
	CONSTRAINT `vehicle_id` UNIQUE(`vehicle_id`)
);

CREATE TABLE IF NOT EXISTS `character_warrants_bolos` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`character_id` int(11) NOT NULL,
	`officer_id` int(11) NOT NULL,
	`details` longtext DEFAULT 'NULL',
	`served` int(11) DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);

CREATE TABLE IF NOT EXISTS `demotions` (
	`demotions_id` int(11) AUTO_INCREMENT NOT NULL,
	`week_number` int(11) NOT NULL,
	`demotion_for` int(11) NOT NULL,
	`demotion_by` int(11) NOT NULL,
	`reasoning` longtext NOT NULL,
	CONSTRAINT `demotions_id_UNIQUE` UNIQUE(`demotions_id`)
);

CREATE TABLE IF NOT EXISTS `incidents` (
	`incident_id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(100) NOT NULL,
	`type` varchar(100) NOT NULL,
	`location` varchar(100) NOT NULL,
	`created_by` int(11) DEFAULT 'NULL',
	`created_date_time` datetime DEFAULT 'NULL',
	`updated_by` int(11) DEFAULT 'NULL',
	`updated_date_time` datetime DEFAULT 'NULL',
	CONSTRAINT `incident_id_UNIQUE` UNIQUE(`incident_id`)
);

CREATE TABLE IF NOT EXISTS `incident_arrests` (
	`arrest_id` int(11) AUTO_INCREMENT NOT NULL,
	`incident_id` int(11) NOT NULL DEFAULT 0,
	`character_id` int(11) NOT NULL,
	`time` int(11) DEFAULT 'NULL',
	`fine` int(11) DEFAULT 'NULL',
	`plea` varchar(50) DEFAULT 'NULL',
	`items_returned` tinyint NOT NULL DEFAULT 0,
	`items_returned_by` int(11) DEFAULT 'NULL',
	`items_returned_date_time` datetime DEFAULT 'NULL',
	`arrested_by` int(11) DEFAULT 'NULL',
	`arrested_date_time` datetime DEFAULT 'NULL',
	`processed_by` int(11) DEFAULT 'NULL',
	`processed_date_time` datetime DEFAULT 'NULL',
	`sealed` tinyint NOT NULL DEFAULT 0,
	`sealed_by` int(11) DEFAULT 'NULL',
	CONSTRAINT `arrest_id` UNIQUE(`arrest_id`)
);

CREATE TABLE IF NOT EXISTS `incident_arrests_charges` (
	`charge_id` int(11) AUTO_INCREMENT NOT NULL,
	`penal_code_charge_id` int(11) DEFAULT 'NULL',
	`arrest_id` int(11) NOT NULL DEFAULT 0,
	`enhancements` varchar(100) DEFAULT 'NULL',
	`counts` int(11) DEFAULT 'NULL',
	`added_by` int(11) DEFAULT 'NULL',
	`added_date_time` datetime DEFAULT 'NULL',
	CONSTRAINT `charge_id` UNIQUE(`charge_id`)
);

CREATE TABLE IF NOT EXISTS `incident_arrests_items` (
	`item_id` int(11) AUTO_INCREMENT NOT NULL,
	`arrest_id` int(11) NOT NULL DEFAULT 0,
	`type` varchar(50) NOT NULL DEFAULT ''0'',
	`item` longtext NOT NULL,
	`added_by` int(11) NOT NULL DEFAULT 0,
	`added_date_time` datetime NOT NULL,
	CONSTRAINT `item_id` UNIQUE(`item_id`)
);

CREATE TABLE IF NOT EXISTS `incident_arrests_mugshots` (
	`mugshot_id` int(11) AUTO_INCREMENT NOT NULL,
	`arrest_id` int(11) NOT NULL,
	`mugshot_title` longtext NOT NULL,
	`mugshot_url` longtext NOT NULL,
	`added_by` int(11) NOT NULL,
	`added_by_date_time` datetime NOT NULL,
	CONSTRAINT `mugshot_id` UNIQUE(`mugshot_id`)
);

CREATE TABLE IF NOT EXISTS `incident_evidence` (
	`evidence_id` int(11) AUTO_INCREMENT NOT NULL,
	`incident_id` int(11) NOT NULL DEFAULT 0,
	`type` varchar(50) NOT NULL DEFAULT ''0'',
	`evidence` longtext NOT NULL,
	`added_by` int(11) NOT NULL DEFAULT 0,
	`added_date_time` datetime NOT NULL DEFAULT ''0000-00-00 00:00:00'',
	CONSTRAINT `evidence_id` UNIQUE(`evidence_id`)
);

CREATE TABLE IF NOT EXISTS `incident_officers` (
	`officers_id` int(11) AUTO_INCREMENT NOT NULL,
	`incident_id` int(11) NOT NULL,
	`character_id` int(11) NOT NULL,
	`added_by` int(11) NOT NULL,
	`added_date_time` datetime NOT NULL,
	`was_injured` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `officers_id_UNIQUE` UNIQUE(`officers_id`)
);

CREATE TABLE IF NOT EXISTS `incident_persons` (
	`persons_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`incident_id` int(11) NOT NULL,
	`character_id` int(11) NOT NULL,
	`phone_number` varchar(20) DEFAULT 'NULL',
	`type` varchar(20) DEFAULT 'NULL',
	`added_by` int(11) DEFAULT 'NULL',
	`added_date_time` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `incident_reports` (
	`report_id` int(11) AUTO_INCREMENT NOT NULL,
	`incident_id` int(11) NOT NULL,
	`type` varchar(50) DEFAULT 'NULL',
	`report` longtext NOT NULL,
	`added_by` int(11) NOT NULL,
	`added_date_time` datetime NOT NULL,
	CONSTRAINT `report_id` UNIQUE(`report_id`)
);

CREATE TABLE IF NOT EXISTS `incident_tags` (
	`tag_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`incident_id` int(11) DEFAULT 0,
	`value` longtext NOT NULL,
	`background_color` varchar(50) NOT NULL DEFAULT '''',
	`text_color` varchar(50) NOT NULL DEFAULT '''',
	`added_by` int(11) DEFAULT 0,
	`added_date_time` datetime DEFAULT ''0000-00-00 00:00:00'',
	CONSTRAINT `tag_id` UNIQUE(`tag_id`)
);

CREATE TABLE IF NOT EXISTS `items` (
	`name` varchar(100) NOT NULL DEFAULT ''item'',
	`label` varchar(100) DEFAULT 'NULL',
	`is_weapon` tinyint DEFAULT 0,
	`is_drug` tinyint DEFAULT 0,
	`is_food` tinyint DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `login` (
	`character_id` int(11) NOT NULL,
	`password` longtext NOT NULL,
	`reset_passphrase` longtext DEFAULT 'NULL',
	`reset_passphrase_date` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `logs` (
	`logId` int(11) AUTO_INCREMENT NOT NULL,
	`note` longtext NOT NULL,
	`timestamp` datetime NOT NULL,
	`loggedBy` int(11) NOT NULL,
	`data` longtext NOT NULL
);

CREATE TABLE IF NOT EXISTS `penal_code_charges` (
	`charge_id` int(11) AUTO_INCREMENT NOT NULL,
	`title` int(11) DEFAULT 'NULL',
	`label` varchar(50) NOT NULL,
	`name` varchar(50) NOT NULL,
	`type` varchar(50) NOT NULL,
	`definition` longtext NOT NULL,
	`time` int(11) NOT NULL,
	`fine` int(11) NOT NULL,
	`result` varchar(50) NOT NULL,
	`points` int(11) DEFAULT 'NULL',
	`added_date_time` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `penal_code_definitions` (
	`definition_id` int(11) AUTO_INCREMENT NOT NULL,
	`label` varchar(50) DEFAULT 'NULL',
	`value` varchar(50) DEFAULT 'NULL',
	`definition` longtext DEFAULT 'NULL',
	`added_date_time` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `penal_code_enhancements` (
	`enhancement_id` int(11) AUTO_INCREMENT NOT NULL,
	`label` varchar(50) DEFAULT 'NULL',
	`name` varchar(50) DEFAULT 'NULL',
	`abbreviation` varchar(50) DEFAULT 'NULL',
	`definition` longtext DEFAULT 'NULL',
	`multiplier` double DEFAULT 'NULL',
	`result` varchar(50) DEFAULT 'NULL',
	`added_date_time` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `penal_code_titles` (
	`title_id` int(11) DEFAULT 'NULL',
	`name` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `ranks` (
	`rank_order` int(11) DEFAULT 'NULL',
	`rank_name` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `ranks_bcso` (
	`rank_order` int(11) DEFAULT 'NULL',
	`rank` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `ranks_fib` (
	`rank_order` int(11) DEFAULT 'NULL',
	`rank` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `ranks_ftp` (
	`rank_order` int(11) DEFAULT 'NULL',
	`rank` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `ranks_gw` (
	`rank_order` int(11) DEFAULT 'NULL',
	`rank` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `ranks_ia` (
	`rank_order` int(11) DEFAULT 'NULL',
	`rank` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `ranks_management` (
	`rank_order` int(11) DEFAULT 'NULL',
	`rank` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `ranks_sahp` (
	`rank_order` int(11) DEFAULT 'NULL',
	`rank` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `ranks_swat` (
	`rank_order` int(11) DEFAULT 'NULL',
	`rank` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `roster` (
	`character_id` int(11) NOT NULL,
	`callsign` varchar(50) NOT NULL DEFAULT '''',
	`discord_id` varchar(100) NOT NULL DEFAULT '''',
	`rank` varchar(100) NOT NULL DEFAULT '''',
	`status` varchar(100) NOT NULL DEFAULT '''',
	`timezone` varchar(10) NOT NULL DEFAULT '''',
	`last_promotion_date` datetime DEFAULT 'NULL',
	`joined_date` datetime NOT NULL
);

CREATE TABLE IF NOT EXISTS `roster_bcso` (
	`character_id` int(11) NOT NULL,
	`rank` varchar(50) DEFAULT 'NULL',
	`note` varchar(100) DEFAULT 'NULL',
	`joined_date` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `roster_certs` (
	`cert_id` int(11) AUTO_INCREMENT NOT NULL,
	`character_id` int(11) NOT NULL DEFAULT 0,
	`type` varchar(50) NOT NULL DEFAULT ''0'',
	`notes` longtext NOT NULL,
	`added_date_time` datetime NOT NULL DEFAULT ''0000-00-00 00:00:00'',
	CONSTRAINT `cert_id` UNIQUE(`cert_id`)
);

CREATE TABLE IF NOT EXISTS `roster_changes` (
	`roster_change_id` int(11) AUTO_INCREMENT NOT NULL,
	`changed_officer` int(11) NOT NULL DEFAULT 0,
	`changed_type` varchar(50) DEFAULT 'NULL',
	`changed_text` longtext NOT NULL,
	`changed_by` int(11) NOT NULL DEFAULT 0,
	`changed_date_time` datetime NOT NULL DEFAULT ''0000-00-00 00:00:00'',
	CONSTRAINT `roster_change_id` UNIQUE(`roster_change_id`)
);

CREATE TABLE IF NOT EXISTS `roster_doj` (
	`character_id` int(11) NOT NULL,
	`discord_id` varchar(100) NOT NULL DEFAULT '''',
	`rank` varchar(50) NOT NULL DEFAULT '''',
	`joined_date` datetime NOT NULL
);

CREATE TABLE IF NOT EXISTS `roster_fib` (
	`character_id` int(11) NOT NULL,
	`rank` varchar(50) NOT NULL DEFAULT '''',
	`note` varchar(100) DEFAULT '''',
	`joined_date` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `roster_ftp` (
	`character_id` int(11) NOT NULL,
	`rank` varchar(50) DEFAULT '''',
	`note` varchar(100) DEFAULT '''',
	`joined_date` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `roster_gw` (
	`character_id` int(11) NOT NULL,
	`rank` varchar(50) DEFAULT '''',
	`note` varchar(100) DEFAULT '''',
	`joined_date` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `roster_ia` (
	`character_id` int(11) NOT NULL,
	`rank` varchar(50) DEFAULT '''',
	`note` varchar(100) DEFAULT '''',
	`joined_date` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `roster_management` (
	`character_id` int(11) NOT NULL,
	`rank` varchar(50) DEFAULT '''',
	`note` varchar(100) DEFAULT '''',
	`joined_date` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `roster_notes` (
	`note_id` int(11) AUTO_INCREMENT NOT NULL,
	`character_id` int(11) NOT NULL DEFAULT 0,
	`type` varchar(50) NOT NULL,
	`note` longtext NOT NULL,
	`added_by` int(11) NOT NULL DEFAULT 0,
	`added_date_time` datetime NOT NULL DEFAULT ''0000-00-00 00:00:00'',
	CONSTRAINT `noteId` UNIQUE(`note_id`)
);

CREATE TABLE IF NOT EXISTS `roster_sahp` (
	`character_id` int(11) NOT NULL,
	`rank` varchar(50) DEFAULT '''',
	`note` varchar(100) DEFAULT '''',
	`joined_date` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `roster_strikes` (
	`strike_id` int(11) AUTO_INCREMENT NOT NULL,
	`character_id` int(11) NOT NULL DEFAULT 0,
	`type` varchar(50) NOT NULL DEFAULT ''0'',
	`reason` longtext NOT NULL,
	`authorized_by` int(11) NOT NULL DEFAULT 0,
	`added_by` int(11) NOT NULL DEFAULT 0,
	`added_date_time` datetime DEFAULT 'NULL',
	CONSTRAINT `strike_id` UNIQUE(`strike_id`)
);

CREATE TABLE IF NOT EXISTS `roster_swat` (
	`character_id` int(11) NOT NULL,
	`rank` varchar(50) DEFAULT '''',
	`note` varchar(100) DEFAULT '''',
	`joined_date` datetime DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `tags` (
	`tag_id` int(11) DEFAULT 'NULL',
	`tag_value` int(11) DEFAULT 'NULL',
	`tag_color` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `time` (
	`character_id` int(11) NOT NULL,
	`on_duty_time` longtext DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `time_extra` (
	`time_id` int(11) AUTO_INCREMENT NOT NULL,
	`character_id` int(11) NOT NULL DEFAULT 0,
	`reasoning` longtext NOT NULL,
	`extra_time` int(11) NOT NULL DEFAULT 0,
	`week_number` int(11) NOT NULL DEFAULT 0,
	`added_by` int(11) NOT NULL DEFAULT 0,
	`added_date_time` datetime NOT NULL DEFAULT ''0000-00-00 00:00:00'',
	CONSTRAINT `time_id` UNIQUE(`time_id`)
);

CREATE TABLE IF NOT EXISTS `vehicles` (
	`model_name` varchar(50) NOT NULL DEFAULT ''vehicle'',
	`label` varchar(50) DEFAULT 'NULL',
	`id` varchar(50) DEFAULT 'NULL'
);

CREATE TABLE IF NOT EXISTS `votes` (
	`vote_id` int(11) AUTO_INCREMENT NOT NULL,
	`vote_week` int(11) NOT NULL DEFAULT 0,
	`voted_by` int(11) NOT NULL DEFAULT 0,
	`vote_for` int(11) NOT NULL DEFAULT 0,
	`vote` bigint(20) NOT NULL DEFAULT 0,
	`reasoning` longtext DEFAULT 'NULL',
	CONSTRAINT `vote_id` UNIQUE(`vote_id`)
);

CREATE INDEX IF NOT EXISTS  `announcement_id` ON `announcements` (`announcement_id`);
CREATE INDEX IF NOT EXISTS  `idx_character_id` ON `characters` (`character_id`);
CREATE INDEX IF NOT EXISTS  `idx_incident_reports_incident_id` ON `incident_reports` (`incident_id`);

DROP PROCEDURE IF EXISTS `DeleteIncidentEvidence`

DELIMITER $$
CREATE PROCEDURE `DeleteIncidentEvidence`(
    IN input_evidence_id INT,
    IN input_officer_id INT
)
BEGIN
    DECLARE incidentId INT;

    -- Retrieve the incident_id associated with the evidence_id
SELECT incident_id INTO incidentId
FROM incident_evidence
WHERE evidence_id = input_evidence_id
    LIMIT 1;

-- Insert log into the logs table
INSERT INTO logs (data, note, timestamp, loggedBy)
VALUES (CONCAT('evidence_id ', input_evidence_id, ' deleted from incident_id ', incidentId),
        'evidence_deleted',
        UTC_TIMESTAMP(),
        input_officer_id);

-- Delete the evidence from incident_evidence
DELETE FROM incident_evidence
WHERE evidence_id = input_evidence_id;
END$$
DELIMITER ;
