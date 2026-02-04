CREATE DATABASE IF NOT EXISTS it;
USE it;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(20) NOT NULL,
    department_id INT,
    lab_id INT
);
CREATE TABLE assets (
    asset_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    lab_id INT
);
CREATE TABLE service_tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    asset_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asset_id) REFERENCES assets(asset_id)
);
CREATE TABLE admin_assignments (
    admin_id INT,
    ticket_id INT,
    FOREIGN KEY (admin_id) REFERENCES users(user_id),
    FOREIGN KEY (ticket_id) REFERENCES service_tickets(ticket_id)
);
DELIMITER $$

DROP PROCEDURE IF EXISTS get_visible_service_tickets $$

CREATE PROCEDURE get_visible_service_tickets(IN p_user_id INT)
BEGIN
    DECLARE v_role VARCHAR(20);
    DECLARE v_department_id INT;
    DECLARE v_lab_id INT;

    SELECT role, department_id, lab_id
    INTO v_role, v_department_id, v_lab_id
    FROM users
    WHERE user_id = p_user_id;

    IF v_role IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User not found';
    END IF;

    IF v_role = 'DEAN' THEN

        SELECT * FROM service_tickets;

    ELSEIF v_role = 'HOD' THEN

        SELECT st.*
        FROM service_tickets st
        JOIN assets a ON st.asset_id = a.asset_id
        WHERE a.department_id = v_department_id;

    ELSEIF v_role = 'LAB_INCHARGE' THEN

        SELECT st.*
        FROM service_tickets st
        JOIN assets a ON st.asset_id = a.asset_id
        WHERE a.lab_id = v_lab_id;

    ELSEIF v_role = 'ADMIN' THEN

        SELECT st.*
        FROM service_tickets st
        JOIN admin_assignments aa ON st.ticket_id = aa.ticket_id
        WHERE aa.admin_id = p_user_id;

    ELSE
        SELECT NULL WHERE 1=0;
    END IF;

END $$

DELIMITER ;

SHOW PROCEDURE STATUS WHERE Db = 'it';
CALL get_visible_service_tickets(1); -- DEAN
CALL get_visible_service_tickets(2); -- HOD
CALL get_visible_service_tickets(3); -- LAB_INCHARGE
CALL get_visible_service_tickets(4); -- ADMIN

INSERT INTO users (role, department_id, lab_id) VALUES
('DEAN', NULL, NULL),
('HOD', 1, NULL),
('LAB_INCHARGE', NULL, 101),
('ADMIN', NULL, NULL);

INSERT INTO assets (department_id, lab_id) VALUES
(1, 101),
(1, 102);

INSERT INTO service_tickets (asset_id) VALUES (1), (2);

INSERT INTO admin_assignments (admin_id, ticket_id) VALUES (4, 1);

SHOW PROCEDURE STATUS WHERE Db = 'it';



